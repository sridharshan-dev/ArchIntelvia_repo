import React, { useState } from 'react';

export default function RTLGenerator({ bestConfig, calculateMetrics }) {
  const [copied, setCopied] = useState(false);

  if (!bestConfig) {
    return (
      <div className="bottom-panel">
        <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'transparent', padding: '0 0 15px 0' }}>
          <h2 style={{ fontSize: '12px' }}>Generated RTL (Verilog)</h2>
        </div>
        <div className="card-content" style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          borderRadius: '4px', 
          border: '1px solid var(--border-color)',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          padding: '15px',
          color: 'var(--text-muted)'
        }}>
          // Awaiting architecture configuration...
        </div>
      </div>
    );
  }

  const { memory_size, data_width, banks, pipeline } = bestConfig;
  const addressWidth = Math.ceil(Math.log2(memory_size));

  const rtlCode = `\
module memory_controller #(
    parameter DATA_WIDTH = ${data_width},
    parameter ADDR_WIDTH = ${addressWidth},
    parameter NUM_BANKS  = ${banks}
)(
    input  wire                    clk,
    input  wire                    reset,
    input  wire                    read_en,
    input  wire                    write_en,
    input  wire  [ADDR_WIDTH-1:0]  addr,
    input  wire  [DATA_WIDTH-1:0]  data_in,
    output reg   [DATA_WIDTH-1:0]  data_out,
    output wire                    ready
);

    // IMA Automatically Generated Architecture
    // Configuration: Memory Size=${memory_size}, Banks=${banks}, Pipeline=${pipeline ? 'Enabled' : 'Disabled'}

${pipeline ? `    // --- Pipeline Registers ---
    reg [ADDR_WIDTH-1:0] addr_pipe;
    reg [DATA_WIDTH-1:0] data_in_pipe;
    reg                  read_en_pipe;
    reg                  write_en_pipe;

    always @(posedge clk) begin
        if (reset) begin
            read_en_pipe  <= 1'b0;
            write_en_pipe <= 1'b0;
        end else begin
            addr_pipe     <= addr;
            data_in_pipe  <= data_in;
            read_en_pipe  <= read_en;
            write_en_pipe <= write_en;
        end
    end
` : ``}
    // --- Bank Selection Logic ---
    wire [$clog2(NUM_BANKS)-1:0] bank_sel = ${pipeline ? 'addr_pipe' : 'addr'}[ADDR_WIDTH-1 : ADDR_WIDTH-$clog2(NUM_BANKS)];
    
    // --- Dummy Core Logic ---
    always @(posedge clk) begin
        if (reset) begin
            data_out <= {DATA_WIDTH{1'b0}};
        end else if (${pipeline ? 'read_en_pipe' : 'read_en'}) begin
            // Simulating read from selected bank
            data_out <= data_in; // dummy echo
        end
    end

    assign ready = 1'b1;

endmodule
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rtlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadRTL = () => {
    const blob = new Blob([rtlCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memory_controller.v';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = () => {
    const { bandwidth, latency, powerIndex } = calculateMetrics(bestConfig);
    const reportText = `\
===========================================
    IMA ARCHITECTURE GENERATION REPORT
===========================================

DESIGN SUMMARY
-------------------------------------------
Memory Size:   ${memory_size}
Data Width:    ${data_width}
Banks:         ${banks}
Pipeline:      ${pipeline ? 'Enabled' : 'Disabled'}

PERFORMANCE ESTIMATES
-------------------------------------------
Bandwidth:     ${bandwidth} bits/cycle
Latency:       ${latency} cycle(s)
Power Index:   ${powerIndex}

AUTOMATIC OPTIMIZATION
-------------------------------------------
Status:        Optimal architecture selected.

===========================================
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bottom-panel">
      <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'transparent', padding: '0 0 15px 0' }}>
        <h2 style={{ fontSize: '12px' }}>
          Generated RTL (Verilog)
          <span style={{ 
              marginLeft: '15px', 
              backgroundColor: 'var(--success-color)', 
              color: '#fff', 
              padding: '2px 8px', 
              borderRadius: '12px', 
              fontSize: '10px',
              textTransform: 'none'
          }}>
            Ready
          </span>
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleCopy}
            style={{
              background: 'transparent',
              color: 'var(--accent-color)',
              border: '1px solid var(--border-color)',
              padding: '5px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.borderColor = 'var(--accent-color)'}
            onMouseOut={(e) => e.target.style.borderColor = 'var(--border-color)'}
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button 
            onClick={handleDownloadRTL}
            style={{
              background: 'transparent',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '5px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            Download RTL
          </button>
          <button 
            onClick={handleGenerateReport}
            style={{
              background: 'var(--accent-color)',
              color: '#fff',
              border: 'none',
              padding: '5px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Generate Report
          </button>
        </div>
      </div>
      
      <div className="card-content" style={{ 
        backgroundColor: '#0a0d12', 
        borderRadius: '4px', 
        border: '1px solid var(--border-color)',
        padding: '15px',
        overflowY: 'auto'
      }}>
        <pre style={{ margin: 0 }}>
          <code style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '12px', 
            color: '#e6edf3',
            lineHeight: '1.5'
          }}>
            {rtlCode}
          </code>
        </pre>
      </div>
    </div>
  );
}
