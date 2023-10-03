import React, { useEffect, useState } from 'react';
import { Department } from './types';
import addFakeWorkload from './utils/addFakeWorkload';
import './App.css';

declare let ymaps: any;

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  
  useEffect(() => {
    let latitude = 55.76;
    let longitude = 37.64;

    function init() {
      navigator.geolocation.getCurrentPosition(function(location) {
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        console.log(latitude, longitude);
      });
      
      const myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [latitude, longitude],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12
      });
      console.error(departments);
      for (let department of departments) {
        myMap.geoObjects.add(new ymaps.Placemark(department.coordinates.latitude, department.coordinates.longitude) );
      }
    }
    async function fetchDepartments() {
      let response = await fetch('http://localhost:3002/addresses');
      let departments = await response.json() as Department[]; // doesn't contain workload yet
      
      addFakeWorkload(departments); // generate fake workload for each department
      setDepartments(departments);
    }
    fetchDepartments();
    ymaps.ready(init);
  }, [departments]);
  
  return (
    <div className="App">
      <div id="map"></div>
    </div>
  );
}

export default App;
