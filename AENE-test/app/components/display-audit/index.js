import React, { useState, useEffect } from 'react';

const AuditDataDisplay = () => {
  const [auditData, setAuditData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Moved the fetch function outside of useEffect
  const fetchAuditData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audit/audit`, {
        method: 'GET',
        headers: {
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAuditData(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchAuditData} className="border rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-300" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Audit Data'}
      </button>
      {error && <p>Error: {error}</p>}
      {auditData.length > 0 && (
        <div>
          <h1>Audit Records</h1>
          {auditData.map((audit) => (
            <div key={audit.id}>
              <p>ID: {audit.id}</p>
              <p>Metadata: {audit.metadata}</p>
              <p>Transaction Hash: {audit.transactionHash}</p>
              <p>Created At: {audit.created_at}</p>
              {/* Include additional details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditDataDisplay;
