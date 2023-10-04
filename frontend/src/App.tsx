import React, { useState, useEffect } from 'react';
import { Department } from './types';
import addFakeWorkload from './utils/addFakeWorkload';
import './App.css';
import Map from './components/Map';
import { Button, Modal} from 'antd';
import { useMemo } from 'react';

const headerStyle: React.CSSProperties = {
  fontSize: '2em',
  textAlign: 'center',
  color: '#fff',
  height: 64,
  // paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

// const contentStyle: React.CSSProperties = {
//   textAlign: 'center',
//   minHeight: 120,
//   lineHeight: '120px',
//   color: '#fff',
//   backgroundColor: '#108ee9',
// };

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchDepartments() {
      let response = await fetch('http://localhost:3002/addresses');
      let json = await response.json(); // doesn't contain workload yet
      let result = json.branches as Department[];
      
      addFakeWorkload(result); // generate fake workload for each department
      setDepartments(result);
      console.log('useEffect')
    }
    fetchDepartments();
  }, []);

  const MapComponent = useMemo(() => <Map departments={departments} />, [departments]);
  
  return (
    <div className="App">
      <header style={headerStyle}>
        <nav className='headerNavigation'>
          <div className='title'>VTB</div>
          <div className='filters'>
            <Button type="primary" onClick={showModal}>
              Filters
            </Button>
          </div>
        </nav>
        <Modal title="Basic Modal"centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </header>
      <main>
        {departments.length !== 0 ? (
          MapComponent
        ) : (
          null
        )}
      </main>
    </div>
  );
}

export default App;
