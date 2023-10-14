import React from 'react';
import {Checkbox} from "antd";
import filtersStore from "../../store/FiltersStore";

const Filters = () => {
    return (
        <div>
            <Checkbox onChange={() => filtersStore.vipOffice = !filtersStore.vipOffice}>VIP office</Checkbox>
            <Checkbox onChange={() => filtersStore.vipZone = !filtersStore.vipZone}>VIP zone</Checkbox>
            <Checkbox onChange={() => filtersStore.ramp = !filtersStore.ramp}>Persons with
                disabilities</Checkbox>
            <Checkbox onChange={() => filtersStore.Prime = !filtersStore.Prime}>Prime</Checkbox>
            <Checkbox onChange={() => filtersStore.juridical = !filtersStore.juridical}>Juridical
                person</Checkbox>
            <Checkbox onChange={() => filtersStore.person = !filtersStore.person}>Natural person</Checkbox>
        </div>
    );
};

export default Filters;