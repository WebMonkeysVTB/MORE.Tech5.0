import React, { useState, useEffect } from 'react';
import { Department } from './types';
import addFakeWorkload from './utils/addFakeWorkload';
import './App.css';
import Map from './components/Map';

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      let response = await fetch('http://localhost:3002/addresses');
      let json = await response.json(); // doesn't contain workload yet
      let result = json.branches as Department[];
      
      addFakeWorkload(result); // generate fake workload for each department
      setDepartments(result);
    }
    fetchDepartments();
  }, []);
  
  return (
    <div className="App">
      {departments.length !== 0 ? (
        <Map departments={departments}></Map>
      ) : (
        null
      )}
    </div>
  );
}

export default App;
