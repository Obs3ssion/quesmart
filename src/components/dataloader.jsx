export default function DataLoader({ onUseSample, onCsvSelected, error }) {
    return (
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Load Data</h2>
            <p className="muted">Upload hourly traffic, or use sample data.</p>
          </div>
        </div>
  
        <div className="controls">
          <label className="file-pill">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => onCsvSelected(e.target.files?.[0] ?? null)}
            />
            <span>Choose CSV</span>
          </label>
  
          <button type="button" className="btn" onClick={onUseSample}>
            Use Sample Data
          </button>
        </div>
  
        <div className="hint">
          <strong>CSV format:</strong> header row + data rows<br />
          <code>hour,customers</code>
        </div>
  
        {error ? <div className="error">{error}</div> : null}
      </section>
    );
  }