import { Department } from "../types";

type MapProps = {
  departments: Department[];
};

declare let ymaps: any;

function Map({ departments }: MapProps) {
  function init() {
    let latitude = 55.76;
    let longitude = 37.64;

    const myMap = new ymaps.Map("map", {
      center: [latitude, longitude],
      zoom: 15,
    });

    console.warn(departments)

    const mapObjects = ymaps.geoQuery(departments.map(department => {
      return new ymaps.Placemark(
        [department.coordinates.latitude, department.coordinates.longitude],
        {
          balloonContentHeader: department.shortName,
          // Зададим содержимое основной части балуна.
          balloonContentBody: `<div>${department.address}</div>`,
          // Зададим содержимое нижней части балуна.
          balloonContentFooter: `<div>Физ. лица: ${department.scheduleFl}</div><div>Юр. лица: ${department.scheduleJurL}</div>`,
          // Зададим содержимое всплывающей подсказки.
          hintContent: department.shortName
        },
        {
          preset: "islands#icon",
          iconColor: "#0095b6",
        }
      )
    }));

    // Найдем объекты, попадающие в видимую область карты.
    mapObjects.searchInside(myMap)
    // И затем добавим найденные объекты на карту.
    .addToMap(myMap);

    myMap.events.add('boundschange', function () {
      // После каждого сдвига карты будем смотреть, какие объекты попадают в видимую область.
      var visibleObjects = mapObjects.searchInside(myMap).addToMap(myMap);
      // Оставшиеся объекты будем удалять с карты.
      mapObjects.remove(visibleObjects).removeFromMap(myMap);
  });
  }
  ymaps.ready(init);
  return (
    <div id="map"></div>
  )
}

export default Map;
