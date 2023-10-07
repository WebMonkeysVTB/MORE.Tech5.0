import React, {FC, useEffect, useMemo, useState} from 'react';
import Map from "../../components/Map";
import {Department, Special} from "../../types";
import addFakeWorkload from "../../utils/addFakeWorkload";
import {MapPageStyled} from "./MapPage.styled";

interface IMapPage {

}

const MapPage: FC<IMapPage> = () => {
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        (async function fetchDepartments() {
            let response = await fetch('http://localhost:3002/addresses');
            let json = await response.json(); // doesn't contain workload yet
            let result = json.branches as Department[];

            addFakeWorkload(result); // generate fake workload for each department
            setDepartments(result);
            console.log('useEffect');
        })()
    }, []);

    const MapComponent = useMemo(() => <Map departments={departments}/>, [departments]);

    return (
        <MapPageStyled>
            {MapComponent}
        </MapPageStyled>
    );
};

export default MapPage;