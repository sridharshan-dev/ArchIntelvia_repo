# backend/llm/prompts.py

PARAM_OPT_PROMPT = """
You are an expert hardware design engineer.

User configuration:
{user_input}

Relevant knowledge:
{context}

Task:
1. Analyze the parameters
2. Suggest improvements ONLY if meaningful
3. Compare original vs optimized

Rules:
- Prefer power-of-2 values
- Balance performance, latency, and complexity
- Do NOT suggest unnecessary changes

Output format (STRICT JSON ONLY):

{{
  "user_params": {{}},
  "optimized_params": {{}},
  "changes": [
    {{
      "parameter": "...",
      "from": ...,
      "to": ...,
      "reason": "..."
    }}
  ],
  "recommendation": "original" OR "optimized"
}}

IMPORTANT:
- Return ONLY JSON
- No explanation outside JSON
"""

ARCH_PLAN_PROMPT = """
You are a hardware architect.

Given memory controller parameters:

{params}

And design knowledge:

{context}

Task:
Generate a high-level architecture plan.

Output STRICT JSON:

{{
  "num_banks": integer,
  "bank_address_bits": integer,
  "local_address_bits": integer,
  "pipeline_stages": integer,
  "arbiter_type": "round_robin" OR "priority",
  "low_power_features": ["clock_gating"] OR [],
  "modules": ["top", "arbiter", "decoder", "bank_array", "pipeline"]
}}

IMPORTANT:
- Return ONLY JSON
"""