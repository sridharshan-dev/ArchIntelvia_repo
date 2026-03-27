import { useState, useRef, useEffect } from 'react';
import logoDark from '../assets/logo_dark.png';
export default function ChatPanel({ messages, processInput, isProcessing, acceptSuggestion, pendingSuggestion }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing]);

  const handleSubmit = (e) => {
    if (e.key === 'Enter' && input.trim() && !isProcessing) {
      processInput(input.trim());
      setInput('');
    }
  };

  return (
    <div className="left-panel">
      <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src={logoDark} 
          onError={(e) => { e.target.src = 'assets/logo.png'; }}
          alt="ArchIntelvia Logo" 
          style={{ width: '20px', height: '20px', filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.2)) brightness(1.1)' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>ArchIntelvia Assistant</h2>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Build Smarter, Not Harder</span>
        </div>
        {isProcessing && <span style={{ fontSize: '12px', color: 'var(--accent-color)', marginLeft: 'auto' }}>Thinking...</span>}
      </div>
      
      <div className="chat-container">
        {messages.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>
            <img 
              src={logoDark} 
              onError={(e) => { e.target.src = 'assets/logo.png'; }}
              alt="ArchIntelvia" 
              style={{ width: '64px', height: '64px', marginBottom: '15px', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.15)) brightness(1.1)' }}
            />
            <div style={{ color: 'var(--text-main)', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
              ArchIntelvia
            </div>
            <i style={{ opacity: 0.8 }}>Automated RTL parameters and insights for modern AI engineering.</i>
            <br/><br/>
            Please enter your memory constraints or an application target to begin the automated design space reasoning. Communicate your requirements, and let us handle your hardware optimization!
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            style={{ 
              marginBottom: '15px',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '90%',
              backgroundColor: msg.role === 'user' ? 'rgba(226, 35, 26, 0.15)' : 'transparent',
              padding: msg.role === 'user' ? '10px 15px' : '0 10px',
              borderRadius: '8px',
              border: msg.role === 'user' ? '1px solid rgba(226, 35, 26, 0.3)' : 'none'
            }}
          >
            <div style={{ 
              fontSize: '11px', 
              color: 'var(--text-muted)', 
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {msg.role === 'user' ? 'You' : 'ArchIntelvia System'}
            </div>
            <div style={{ 
              fontSize: '13px', 
              color: msg.role === 'user' ? 'var(--text-main)' : 'var(--accent-color)',
              whiteSpace: 'pre-wrap',
              fontFamily: msg.role === 'system' ? 'var(--font-mono)' : 'var(--font-main)',
              lineHeight: '1.6'
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {pendingSuggestion != null && (
           <div style={{ marginTop: '10px' }}>
              <button 
                onClick={acceptSuggestion}
                disabled={isProcessing}
                style={{
                  background: 'var(--success-color)',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Accept Suggestion
              </button>
           </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-input-container">
        <input 
          type="text" 
          placeholder="Enter constraints or purpose..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSubmit}
          disabled={isProcessing}
          style={{
            width: '100%',
            padding: '12px 15px',
            backgroundColor: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            color: 'var(--text-main)',
            outline: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            transition: 'border-color 0.2s',
            opacity: isProcessing ? 0.6 : 1
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>
    </div>
  );
}
