import React from 'react';

export default function DesignSpace({ exploredArchitectures, bestConfig, isProcessing }) {
  if (isProcessing) {
    return (
      <div className="card" style={{ flex: 1.5 }}>
        <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
          <h2 style={{ fontSize: '12px' }}>Design Space Exploration</h2>
        </div>
        <div className="card-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: 'var(--accent-color)', fontSize: '13px', animation: 'pulse 1.5s infinite' }}>
            Exploring architectures...
          </div>
        </div>
      </div>
    );
  }

  if (!exploredArchitectures || exploredArchitectures.length === 0) {
    return (
      <div className="card" style={{ flex: 1.5 }}>
        <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
          <h2 style={{ fontSize: '12px' }}>Design Space Exploration</h2>
        </div>
        <div className="card-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Awaiting constraints to begin exploration...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ flex: 1.5 }}>
      <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
        <h2 style={{ fontSize: '12px' }}>
          Design Space Exploration
          <span style={{ 
            marginLeft: '15px', 
            backgroundColor: 'var(--accent-color)', 
            color: '#fff', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '10px' 
          }}>
            {exploredArchitectures.length} Architectures Explored
          </span>
        </h2>
      </div>
      <div className="card-content" style={{ padding: '0', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'var(--text-muted)' }}>
            <tr>
              <th style={{ padding: '10px 15px', fontWeight: 'normal', borderBottom: '1px solid var(--border-color)' }}>Architecture</th>
              <th style={{ padding: '10px 15px', fontWeight: 'normal', borderBottom: '1px solid var(--border-color)' }}>Banks</th>
              <th style={{ padding: '10px 15px', fontWeight: 'normal', borderBottom: '1px solid var(--border-color)' }}>Pipeline</th>
              <th style={{ padding: '10px 15px', fontWeight: 'normal', borderBottom: '1px solid var(--border-color)' }}>Performance</th>
              <th style={{ padding: '10px 15px', fontWeight: 'normal', borderBottom: '1px solid var(--border-color)' }}>Power</th>
              <th style={{ padding: '10px 15px', fontWeight: 'normal', borderBottom: '1px solid var(--border-color)' }}>Score</th>
            </tr>
          </thead>
          <tbody>
  {exploredArchitectures.map((arch, index) => {
    const isBest =
      bestConfig &&
      arch.banks === bestConfig.banks &&
      arch.pipeline === bestConfig.pipeline;

    return (
      <tr
        key={index}
        style={{
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: isBest ? 'rgba(0, 255, 100, 0.1)' : 'transparent',
          borderLeft: isBest ? '3px solid #00ff88' : '3px solid transparent'
        }}
      >
        <td style={{ padding: '12px 15px', color: isBest ? '#00ff88' : 'var(--text-main)' }}>
          Arch {index + 1} {isBest && '★'}
        </td>

        <td style={{ padding: '12px 15px', fontFamily: 'var(--font-mono)' }}>
          {arch.banks}
        </td>

        <td style={{ padding: '12px 15px', fontFamily: 'var(--font-mono)' }}>
          {arch.pipeline ? 'On' : 'Off'}
        </td>

        {/* 🔥 REAL PERFORMANCE */}
        <td style={{ padding: '12px 15px', fontFamily: 'var(--font-mono)' }}>
          {arch.performance} bits/cycle
        </td>

        {/* 🔥 REAL POWER */}
        <td style={{ padding: '12px 15px', fontFamily: 'var(--font-mono)' }}>
          {arch.power}
        </td>
        <td style={{ padding: '12px 15px', fontFamily: 'var(--font-mono)' }}>
  {arch.score}
</td>
      </tr>
    );
  })}
</tbody>
        </table>
        {bestConfig && (
           <div style={{ padding: '15px', fontSize: '12px', borderTop: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <strong style={{ color: 'var(--text-main)' }}>Best Architecture Selected: </strong>
              <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>Banks: {bestConfig.banks}, Pipeline: {bestConfig.pipeline ? 'On' : 'Off'}</span>
           </div>
        )}
      </div>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
