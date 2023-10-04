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
      zoom: 12,
    });

    console.warn(departments)

    for (let department of departments) {
      myMap.geoObjects.add(
        new ymaps.Placemark(
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
      );
    }
  }
  ymaps.ready(init);
  return (
    <div id="map"></div>
  )
}

export default Map;
