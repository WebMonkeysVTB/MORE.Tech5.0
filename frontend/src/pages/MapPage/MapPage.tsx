import React, {FC, useEffect, useMemo, useState} from 'react';
import Map from "../../components/Map/Map";
import {MapPageStyled} from "./MapPage.styled";
import departmentsFiltersStore from '../../store/DepartmentsFiltersStore';
import atmsFiltersStore from '../../store/AtmsFiltersStore';
import { observer } from 'mobx-react-lite';
import {fetchAtms, fetchDepartments} from "../../api";
import departmentsStore from "../../store/DepartmentsStore";
import atmsStore from "../../store/AtmsStore";
import RefreshIcon from '@mui/icons-material/Refresh';
import coordsStore from "../../store/CoordsStore";

interface IMapPage {

}

const MapPage: FC<IMapPage> = observer(() => {
    useEffect(() => {
        (async function () {
            await fetchDepartments();
            await fetchAtms();
        })();
    }, [departmentsFiltersStore.data, atmsFiltersStore.data]);

    const MapComponent = useMemo(() => <Map />, [departmentsStore.data, atmsStore.data]);

    return (
        <MapPageStyled>
            <RefreshIcon className={'refresh'} onClick={async () => {
                await fetchDepartments();
                await fetchAtms();
            }}/>
            {MapComponent}
        </MapPageStyled>
    );
});

export default MapPage;