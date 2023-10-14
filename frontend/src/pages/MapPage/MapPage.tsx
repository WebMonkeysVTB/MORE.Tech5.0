import React, {FC, useEffect, useMemo, useState} from 'react';
import Map from "../../components/Map/Map";
import {Department, Special} from "../../types";
import addFakeWorkload from "../../utils/addFakeWorkload";
import {MapPageStyled} from "./MapPage.styled";

interface IMapPage {

}

const MapPage: FC<IMapPage> = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [atms, setAtms] = useState([])

    useEffect(() => {
        (async function fetchDepartments() {
            let response = await fetch('http://localhost:1234/api/departments');
            let result = await response.json(); // doesn't contain workload yet
            setDepartments(result);
        })();
        (async function fetchAtms() {
            let response = await fetch('http://localhost:1234/api/atms');
            let result = await response.json(); // doesn't contain workload yet
            setAtms(result);
        })();

    }, []);

    const MapComponent = useMemo(() => <Map departments={departments} atms={atms}/>, [departments, atms]);

    return (
        <MapPageStyled>
            {MapComponent}
        </MapPageStyled>
    );
};

export default MapPage;