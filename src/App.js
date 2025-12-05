import React, { useState, useCallback } from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddSuccess = useCallback(() => {
    setRefreshKey(oldKey => oldKey + 1);
  }, []);

  return (
    <div className="container">
      <div className="form-section">
        <CompteForm onAddSuccess={handleAddSuccess} />
      </div>
      <div className="list-section">
        <CompteList key={refreshKey} />
      </div>
    </div>
  );
}

export default App;