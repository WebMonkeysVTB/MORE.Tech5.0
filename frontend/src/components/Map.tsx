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
            balloonContent: "цвет <strong>воды пляжа бонди</strong>",
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
