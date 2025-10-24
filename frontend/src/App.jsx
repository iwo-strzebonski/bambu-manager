import { useState, useEffect } from 'react'

function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setBackendStatus(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch backend status:', err);
        setBackendStatus({ status: 'error', message: err.message });
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Bambu Manager</h1>
      <div style={{ marginTop: '2rem' }}>
        <h2>Backend Status</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
            {JSON.stringify(backendStatus, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

export default App
