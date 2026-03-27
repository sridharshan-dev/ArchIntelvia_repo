import { useState } from "react";

export function useDesignSpace() {
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState(null);
  const [bestConfig, setBestConfig] = useState(null);
  const [exploredArchitectures, setExploredArchitectures] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingSuggestion, setPendingSuggestion] = useState(null);
  
  // Conversational Memory State
  const [currentParams, setCurrentParams] = useState(null);

  // backend call
  async function callBackend(userInput) {
    const res = await fetch("http://127.0.0.1:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: userInput, current_params: currentParams }),
    });

    return await res.json();
  }

  // main function used by ChatPanel
  const processInput = async (input) => {
    setIsProcessing(true);

    // add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const data = await callBackend(input);
      
      // Update memory with latest parsed params from backend
      if (data.user_params) {
        setCurrentParams(data.user_params);
      }

      // STEP 1: ASK PURPOSE
      if (data.ask_purpose) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: data.message,
          },
        ]);
        setIsProcessing(false);
        return;
      }

      // STEP 2: SUGGESTION FLOW
      if (data.suggestion_available && data.suggested_params) {
        let contentStr = `
Your configuration is valid, however a better relaxed configuration was found:
Memory Size: ${data.suggested_params.memory_size}
Data Width: ${data.suggested_params.data_width}
Banks: ${data.suggested_params.banks}
Pipeline: ${data.suggested_params.pipeline ? "enabled" : "disabled"}

Do you want to accept the optimized configuration?
`;
        if (data.reasoning) {
            contentStr += `\n\n**Reasoning:** ${data.reasoning}`;
        }
          
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: contentStr,
          },
        ]);

        // Show the strict best config natively first, but offer suggestion
        setMode(data.mode);
        setBestConfig(data.final_params);
        setExploredArchitectures(data.all_designs);

        setPendingSuggestion(data.suggested_params); // store suggestion
        setIsProcessing(false);
        return;
      }

      // STEP 3: NORMAL FLOW
      let contentStr = `
Detected Mode: ${data.mode}
Optimization Goal: ${data.goal}

Explored ${data.designs_explored} architectures

Best Configuration Selected:
Memory Size: ${data.final_params.memory_size}
Data Width: ${data.final_params.data_width}
Banks: ${data.final_params.banks}
Pipeline: ${data.final_params.pipeline ? "enabled" : "disabled"}
`;
      if (data.reasoning) {
          contentStr += `\n\n**Reasoning:** ${data.reasoning}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: contentStr,
        },
      ]);

      // update UI
      setMode(data.mode);
      setBestConfig(data.final_params);
      setExploredArchitectures(data.all_designs);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Error connecting to backend.",
        },
      ]);
    }

    setIsProcessing(false);
  };

  // accept suggestion logic
  const acceptSuggestion = () => {
    if (!pendingSuggestion) return;

    setBestConfig(pendingSuggestion);

    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: "Optimized configuration accepted.",
      },
    ]);

    setPendingSuggestion(null);
  };

  // simple metrics
  const calculateMetrics = (config) => {
    if (!config) return null;

    return {
      bandwidth: config.banks * config.data_width,
      latency: config.pipeline ? 2 : 1, // Adjusted latency based on typical pipeline behavior
      power: config.banks + (config.pipeline ? 1 : 0) // Basic power estimation
    };
  };

  return {
    messages,
    mode,
    bestConfig,
    exploredArchitectures,
    isProcessing,
    processInput,
    calculateMetrics,
    acceptSuggestion,
    pendingSuggestion // Exposing pendingSuggestion so chat can render accept button
  };
}