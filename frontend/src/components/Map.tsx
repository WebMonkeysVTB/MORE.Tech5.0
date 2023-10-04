import { useLayoutEffect, useEffect } from "react";
import { Special, Department } from "../types";

type MapProps = {
  departments: Department[];
  filters: Special;
};

declare let ymaps: any;
var myMap: any = null;

function Map({ departments, filters }: MapProps) {
  const latitude = 55.76;
  const longitude = 37.64;

  useLayoutEffect(() => {
    myMap = new ymaps.Map("map", {
      center: [latitude, longitude],
      zoom: 15,
    });
  }, [])
  
  useEffect(() => {
    function init() {
      console.warn(departments);

      const filteredDepartments = departments.filter(department => {
        if (filters.vipOffice && !department.special.vipOffice) {
          console.warn('trigger vip office');
          return false;
        }
        if (filters.vipZone && !department.special.vipZone) {
          return false;
        }
        if (filters.ramp && !department.special.ramp) {
          return false;
        }
        if (filters.Prime && !department.special.Prime) {
          return false;
        }
        if (filters.person && !department.special.person) {
          return false;
        }
        if (filters.juridical && !department.special.juridical) {
          return false;
        }
        return true;
      });

      console.error(filteredDepartments);
  
      const mapObjects = ymaps.geoQuery(filteredDepartments.map(department => {
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

      myMap.geoObjects.removeAll();
  
      // Найдем объекты, попадающие в видимую область карты.
      mapObjects.searchInside(myMap)
      // И затем добавим найденные объекты на карту.
      .addToMap(myMap);
  
      myMap.events.add('boundschange', function () {
        myMap.geoObjects.removeAll();
        // После каждого сдвига карты будем смотреть, какие объекты попадают в видимую область.
        var visibleObjects = mapObjects.searchInside(myMap).addToMap(myMap);
        // Оставшиеся объекты будем удалять с карты.
        mapObjects.remove(visibleObjects).removeFromMap(myMap);
      });
    }
    ymaps.ready(init);
  }, [departments, filters]);

  return (
    <div id="map"></div>
  )
}

export default Map;
