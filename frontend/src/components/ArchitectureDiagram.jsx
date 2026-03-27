import React from 'react';

export default function ArchitectureDiagram({ bestConfig }) {
  if (!bestConfig) {
    return (
      <div style={{ color: 'var(--text-muted)', padding: '20px' }}>
        No architecture selected yet...
      </div>
    );
  }

  const banks = bestConfig.banks || 1;
  const pipeline = bestConfig.pipeline;
  const width = bestConfig.data_width;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      
      {/* CPU */}
      <div style={boxStyle}>CPU / Interface</div>

      {/* Pipeline (conditional) */}
      {pipeline && (
        <>
          <div style={arrowStyle}>↓</div>
          <div style={{ ...boxStyle, backgroundColor: '#ffaa00' }}>
            Pipeline Stage
          </div>
        </>
      )}

      {/* Controller */}
      <div style={arrowStyle}>↓</div>
      <div style={{ ...boxStyle, backgroundColor: '#e2231a' }}>
        Memory Controller ({width}-bit)
      </div>

      {/* Decoder */}
      <div style={arrowStyle}>↓</div>
      <div style={{ ...boxStyle, backgroundColor: '#333' }}>
        Address Decoder
      </div>

      {/* Banks */}
      <div style={arrowStyle}>↓</div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
        flexWrap: 'wrap'
      }}>
        {Array.from({ length: banks }).map((_, i) => (
          <div key={i} style={bankStyle}>
            B{i}
          </div>
        ))}
      </div>

    </div>
  );
}

// styles
const boxStyle = {
  border: '1px solid var(--border-color)',
  padding: '10px 15px',
  margin: '10px auto',
  borderRadius: '6px',
  width: '200px',
  backgroundColor: '#222',
  color: '#fff',
  fontSize: '12px'
};

const bankStyle = {
  border: '1px solid #00ff88',
  padding: '8px 12px',
  borderRadius: '6px',
  backgroundColor: 'rgba(0,255,100,0.1)',
  fontSize: '12px',
  minWidth: '40px'
};

const arrowStyle = {
  color: 'var(--text-muted)',
  fontSize: '18px',
  margin: '5px'
};