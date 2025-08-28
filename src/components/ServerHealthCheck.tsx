'use client';

import { useState, useEffect } from 'react';

export default function ServerHealthCheck() {
  const [serverStatus, setServerStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('/api/test');
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'ok') {
            setServerStatus('ok');
          } else {
            setServerStatus('error');
            setErrorMessage('Server responded but status not ok');
          }
        } else {
          setServerStatus('error');
          setErrorMessage(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        setServerStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    checkServer();
  }, []);

  if (serverStatus === 'checking') {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-800 text-sm">Checking server...</span>
        </div>
      </div>
    );
  }

  if (serverStatus === 'error') {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-300 rounded-lg p-3 shadow-lg max-w-xs">
        <div className="flex items-center gap-2">
          <span className="text-red-600">❌</span>
          <div>
            <div className="text-red-800 text-sm font-semibold">Server Error</div>
            <div className="text-red-700 text-xs">{errorMessage}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-300 rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-green-600">✅</span>
        <span className="text-green-800 text-sm">Server OK</span>
      </div>
    </div>
  );
}





