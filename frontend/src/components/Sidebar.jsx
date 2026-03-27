import React from 'react';
import logoDark from '../assets/logo_dark.png';export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'rtl', label: 'RTL & Report' }
  ];

  return (
    <div className="sidebar" style={{
      width: '200px',
      flexShrink: 0,
      backgroundColor: 'var(--panel-bg)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0'
    }}>
      <div style={{
        padding: '0 20px 20px 20px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <img 
          src={logoDark} 
          alt="ArchIntelvia Logo" 
          onError={(e) => { e.target.src = 'assets/logo.png'; }}
          style={{ width: '48px', height: '48px', marginBottom: '10px', filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2)) brightness(1.1)' }} 
        />
        <h1 style={{ 
          fontSize: '18px', 
          color: 'var(--text-main)', 
          margin: 0,
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }}>
          ArchIntelvia
        </h1>
        <div style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          marginTop: '4px',
          fontWeight: '500'
        }}>
          Build Smarter, Not Harder
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0 10px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 15px',
              backgroundColor: activeTab === tab.id ? 'rgba(226, 35, 26, 0.1)' : 'transparent',
              color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-main)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            }}
            onMouseOut={(e) => {
              if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
