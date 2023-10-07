import {useLayoutEffect, useEffect, useState, FC} from "react";
import { Special, Department } from "../types";
import addFakeWorkload from "../utils/addFakeWorkload";
import {observer} from "mobx-react-lite";
import filters from "../store/FiltersStore";

declare let ymaps: any;
var myMap: any = null;

interface IMap {
  departments: Department[],
}

const Map: FC<IMap> = observer(({departments}) => {

  const latitude = 55.76;
  const longitude = 37.64;

  useLayoutEffect(() => {
    myMap = new ymaps.Map("map", {
      center: [latitude, longitude],
      zoom: 15,
      controls: ['routePanelControl']
    }, {
      searchControlProvider: 'yandex#search'
    });
    var control = myMap.controls.get('routePanelControl');

    // Зададим состояние панели для построения машрутов.
    control.routePanel.state.set({
        // Тип маршрутизации.
        type: 'auto',
        // Выключим возможность задавать пункт отправления в поле ввода.
        fromEnabled: true,
        // Адрес или координаты пункта отправления.
        // from: 'Москва, Льва Толстого 16',
        // Включим возможность задавать пункт назначения в поле ввода.
        toEnabled: true
        // Адрес или координаты пункта назначения.
        //to: 'Петербург'
    });

    // Зададим опции панели для построения машрутов.
    control.routePanel.options.set({
        // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
        allowSwitch: false,
        // Включим определение адреса по координатам клика.
        // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
        reverseGeocoding: true,
        // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
        types: { auto: true, masstransit: true, pedestrian: true }
    });

    // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
    var switchPointsButton = new ymaps.control.Button({
        data: {content: "Поменять местами", title: "Поменять точки местами"},
        options: {selectOnClick: false, maxWidth: 160}
    });
    // Объявляем обработчик для кнопки.
    switchPointsButton.events.add('click', function () {
        // Меняет местами начальную и конечную точки маршрута.
        control.routePanel.switchPoints();
    });
    myMap.controls.add(switchPointsButton);

    // Создадим экземпляр элемента управления «поиск по карте»
    // с установленной опцией провайдера данных для поиска по организациям.
    var searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#search'
        }
    });
    
    myMap.controls.add(searchControl);
  }, [])
  
  useEffect(() => {
    console.log('refresh filters')
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
  }, [departments, filters.data]);

  return (
    <div id="map"></div>
  )
})

export default Map;
