import {useLayoutEffect, useEffect, useState, FC} from "react";
import {observer} from "mobx-react-lite";
import filters from "../../store/FiltersStore";
import departmentsStore from "../../store/DepartmentsStore";
import atmsStore from "../../store/AtmsStore";
import {signUpQueue} from '../../api';

interface IDepartment {
    "id": number | string;
    salePointName: string;
    address: string;
    city: string;
    status: string;
    openHours: string;
    openHoursIndividual: string;
    rko: string;
    officeType: string;
    salePointFormat: string;
    suoAvailability: boolean;
    hasRamp: boolean;
    latitude: number;
    longitude: number;
    metroStation: string;
    myBranch: boolean;
    kep: boolean;
}

declare let ymaps: any;
var myMap: any = null;

interface IMap {

}

const Map: FC<IMap> = observer(() => {

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
            types: {auto: true, masstransit: true, pedestrian: true}
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
            let mapObjects = ymaps.geoQuery([...departmentsStore.data, ...atmsStore.data].map((store, index) => {
                if (store.type == "department") {
                    const color = '#0095b6'
                    return new ymaps.Placemark(
                        [store.latitude, store.longitude],
                        {
                            balloonContentHeader: "Отделение",
                            // Зададим содержимое основной части балуна.
                            balloonContentBody: `<div>${store.address}</div>`,
                            // Зададим содержимое нижней части балуна.
                            balloonContentFooter: `<div><button onclick="signUpQueue('department', store.id)">Записаться</button><button>Загружен</button></div>`,
                            // Зададим содержимое всплывающей подсказки.
                            hintContent: "Отделение"
                        },
                        {
                            preset: "islands#icon",
                            iconColor: color,
                        }
                    )
                } else {
                    const color = '#9900b6'
                    return new ymaps.Placemark(
                        [store.latitude, store.longitude],
                        {
                            balloonContentHeader: "Банкомат",
                            // Зададим содержимое основной части балуна.
                            balloonContentBody: `<div>${store.address}</div>`,
                            // Зададим содержимое нижней части балуна.
                            balloonContentFooter: `<div><button onclick="signUpQueue('atm', store.id)">Записаться</button><button>Загружен</button></div>`,
                            // Зададим содержимое всплывающей подсказки.
                            hintContent: "Банкомат"
                        },
                        {
                            preset: "islands#icon",
                            iconColor: color,
                        }
                    )
                }
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
    }, [departmentsStore.data, atmsStore.data]);

    return (
        <div id="map"></div>
    )
})

export default Map;
