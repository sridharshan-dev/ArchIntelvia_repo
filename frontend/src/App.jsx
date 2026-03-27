import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ChatPanel from './components/ChatPanel'
import DesignSpace from './components/DesignSpace'
import ArchitectureSummary from './components/ArchitectureSummary'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import RTLGenerator from './components/RTLGenerator'
import { useDesignSpace } from './hooks/useDesignSpace'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {
    messages,
    mode,
    bestConfig,
    exploredArchitectures,
    isProcessing,
    processInput,
    calculateMetrics,
    acceptSuggestion,
    pendingSuggestion
  } = useDesignSpace();

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <ChatPanel 
        messages={messages} 
        processInput={processInput} 
        isProcessing={isProcessing} 
        acceptSuggestion={acceptSuggestion}
        pendingSuggestion={pendingSuggestion}
      />

      <div className="right-panel">
        <div className="panel-header">
          <h2>
            {activeTab === 'dashboard' && 'Architecture Dashboard'}
            {activeTab === 'visualization' && 'Architecture Visualization'}
            {activeTab === 'rtl' && 'RTL & Report Generator'}
            
            {mode && (
              <span style={{ 
                marginLeft: '15px', 
                backgroundColor: 'rgba(226, 35, 26, 0.1)', 
                color: 'var(--accent-color)', 
                border: '1px solid var(--accent-color)',
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '10px',
                textTransform: 'none'
              }}>
                Mode: {mode}
              </span>
            )}
          </h2>
          <div style={{ fontSize: '12px', color: isProcessing ? 'var(--warning-color)' : 'var(--text-muted)' }}>
            Status: {isProcessing ? 'Exploring Design Space...' : (mode ? 'Optimized' : 'Idle')}
          </div>
        </div>
        
        <div className="main-content">
          {activeTab === 'dashboard' && (
            <>
              <div className="top-row">
                <DesignSpace 
                  exploredArchitectures={exploredArchitectures} 
                  bestConfig={bestConfig} 
                  isProcessing={isProcessing}
                />
                <ArchitectureSummary 
                  bestConfig={bestConfig} 
                  calculateMetrics={calculateMetrics}
                />
              </div>
              <div className="top-row" style={{ minHeight: '300px' }}>
                <ArchitectureDiagram bestConfig={bestConfig} />
              </div>
            </>
          )}

          {activeTab === 'rtl' && (
             <RTLGenerator bestConfig={bestConfig} calculateMetrics={calculateMetrics} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
