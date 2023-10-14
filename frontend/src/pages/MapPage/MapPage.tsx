import React, {FC, useEffect, useMemo, useState} from 'react';
import Map from "../../components/Map";
import {Department, Special} from "../../types";
import addFakeWorkload from "../../utils/addFakeWorkload";
import {MapPageStyled} from "./MapPage.styled";
import departmentsFiltersStore from '../../store/DepartmentsFiltersStore';
import atmsFiltersStore from '../../store/AtmsFiltersStore';
import { observer } from 'mobx-react-lite';

interface IMapPage {

}

const MapPage: FC<IMapPage> = observer(() => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [atms, setAtms] = useState<any[]>([])

    useEffect(() => {
        async function fetchDepartments() {
            const url = new URL('http://localhost:1234/api/departments');
            // if (departmentsFiltersStore.data.officeType) {
            //     url.searchParams.append('officeType', String(departmentsFiltersStore.data.officeType));
            // }
            if (departmentsFiltersStore.data.hasRamp) {
                url.searchParams.append('hasRamp', String(departmentsFiltersStore.data.hasRamp));
            }
            let response = await fetch(url);
            let result = await response.json(); // doesn't contain workload yet

            setDepartments(result);
        };
        async function fetchAtms() {
            const url = new URL('http://localhost:1234/api/atms');
            if (atmsFiltersStore.data.wheelchair) {
                url.searchParams.append('wheelchair', String(atmsFiltersStore.data.wheelchair));
            }
            if (atmsFiltersStore.data.blind) {
                url.searchParams.append('blind', String(atmsFiltersStore.data.blind));
            }
            if (atmsFiltersStore.data.nfcForBankCards) {
                url.searchParams.append('nfcForBankCards', String(atmsFiltersStore.data.nfcForBankCards));
            }
            if (atmsFiltersStore.data.qrRead) {
                url.searchParams.append('qrRead', String(atmsFiltersStore.data.qrRead));
            }
            if (atmsFiltersStore.data.supportsUsd) {
                url.searchParams.append('supportsUsd', String(atmsFiltersStore.data.supportsUsd));
            }
            if (atmsFiltersStore.data.supportsChargeRub) {
                url.searchParams.append('supportsChargeRub', String(atmsFiltersStore.data.supportsChargeRub));
            }
            if (atmsFiltersStore.data.supportsEur) {
                url.searchParams.append('supportsEur', String(atmsFiltersStore.data.supportsEur));
            }
            if (atmsFiltersStore.data.supportsRub) {
                url.searchParams.append('supportsRub', String(atmsFiltersStore.data.supportsRub));
            }

            let response = await fetch(url);
            let result = await response.json(); // doesn't contain workload yet
            setAtms(result);
        };
        (async function () {
            // console.error(departmentsFiltersStore.data.officeType);
            console.error(departmentsFiltersStore.data.hasRamp);
            console.error(atmsFiltersStore.data);

            await fetchDepartments();
            await fetchAtms();
        })();
    }, [departmentsFiltersStore.data, atmsFiltersStore.data]);

    const MapComponent = useMemo(() => <Map departments={departments} atms={atms}/>, [departments, atms]);

    return (
        <MapPageStyled>
            {MapComponent}
        </MapPageStyled>
    );
});

export default MapPage;