import React from 'react';
import './App.css';
declare let ymaps: any;

function App() {
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
  }

  console.log(latitude, longitude);
  ymaps.ready(init);

  return (
    <div className="App">
      <div id="map"></div>
    </div>
  );
}

export default App;
