import React from 'react';

export default function ArchitectureSummary({ bestConfig, calculateMetrics }) {

  if (!bestConfig) {
    return (
      <div className="card" style={{ flex: 1 }}>
        <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
          <h2 style={{ fontSize: '12px' }}>Architecture Summary</h2>
        </div>
        <div className="card-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center' }}>
            No configuration selected.
          </div>
        </div>
      </div>
    );
  }

  const { bandwidth, latency, powerIndex } = calculateMetrics(bestConfig);

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
        <h2 style={{ fontSize: '12px' }}>Architecture Summary</h2>
      </div>
      <div className="card-content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
         
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '13px' }}>
            {/* Parameters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Memory Size</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{bestConfig.memory_size}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Data Width</span>
               <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{bestConfig.data_width}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Banks</span>
               <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{bestConfig.banks}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Pipeline</span>
               <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: bestConfig.pipeline ? 'var(--success-color)' : 'var(--text-muted)' }}>
                 {bestConfig.pipeline ? 'Enabled' : 'Disabled'}
               </span>
            </div>
         </div>

         <div style={{ borderTop: '1px dashed var(--border-color)', margin: '5px 0' }} />

         {/* Estimations */}
         <div>
            <h3 style={{ fontSize: '12px', color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase' }}>Performance Estimates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Bandwidth</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{bandwidth} bits/cycle</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Latency</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{latency} cycle{latency > 1 ? 's' : ''}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Power Index</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{powerIndex}</span>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
