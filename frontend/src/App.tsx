import React, { useState, useEffect, useRef } from 'react';
import { Special, Department } from './types';
import addFakeWorkload from './utils/addFakeWorkload';
import './App.css';
import Map from './components/Map';
import { Button, Checkbox, Modal} from 'antd';
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

  const isVipOfficeRef = useRef<boolean>(false);
  const isVipZoneRef = useRef<boolean>(false);
  const isRampRef = useRef<boolean>(false);
  const isPrimeRef = useRef<boolean>(false);
  const isPersonRef = useRef<boolean>(false);
  const isJuridicalRef = useRef<boolean>(false);

  const [filters, setFilters] = useState<Special>({
    vipZone: false,
    vipOffice: false,
    ramp: false,
    Prime: false,
    person: false,
    juridical: false
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setFilters({
      vipZone: isVipZoneRef.current,
      vipOffice: isVipOfficeRef.current,
      ramp: isRampRef.current,
      Prime: isPrimeRef.current,
      person: isPersonRef.current,
      juridical: isJuridicalRef.current
    });
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
      console.log('useEffect');
    }
    fetchDepartments();
  }, []);

  const MapComponent = useMemo(() => <Map departments={departments} filters={filters}/>, [departments, filters]);
  
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

        <Modal title="Filter departments"centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Checkbox onChange={() => isVipOfficeRef.current = !isVipOfficeRef.current}>VIP office</Checkbox>
          <Checkbox onChange={() => isVipZoneRef.current = !isVipZoneRef.current}>VIP zone</Checkbox>
          <Checkbox onChange={() => isRampRef.current = !isRampRef.current}>Persons with disabilities</Checkbox>
          <Checkbox onChange={() => isPrimeRef.current = !isPrimeRef.current}>Prime</Checkbox>
          <Checkbox onChange={() => isJuridicalRef.current = !isJuridicalRef.current}>Juridical person</Checkbox>
          <Checkbox onChange={() => isPersonRef.current = !isPersonRef.current}>Natural person</Checkbox>
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
