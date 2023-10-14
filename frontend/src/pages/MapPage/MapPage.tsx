import React, {FC, useEffect, useMemo, useState} from 'react';
import Map from "../../components/Map/Map";
import {MapPageStyled} from "./MapPage.styled";
import departmentsFiltersStore from '../../store/DepartmentsFiltersStore';
import atmsFiltersStore from '../../store/AtmsFiltersStore';
import { observer } from 'mobx-react-lite';
import {fetchAtms, fetchDepartments} from "../../api";
import departmentsStore from "../../store/DepartmentsStore";
import atmsStore from "../../store/AtmsStore";

interface IMapPage {

}

const MapPage: FC<IMapPage> = observer(() => {
    useEffect(() => {
        (async function () {
            // console.error(departmentsFiltersStore.data.officeType);
            console.error(departmentsFiltersStore.data.hasRamp);
            console.error(atmsFiltersStore.data);

            await fetchDepartments();
            await fetchAtms();
        })();
    }, [departmentsFiltersStore.data, atmsFiltersStore.data]);

    const MapComponent = useMemo(() => <Map />, [departmentsStore.data, atmsStore.data]);

    return (
        <MapPageStyled>
            {MapComponent}
        </MapPageStyled>
    );
});

export default MapPage;