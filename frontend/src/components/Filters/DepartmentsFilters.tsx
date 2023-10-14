import React from 'react';
import {Checkbox} from "antd";
import departmentsFiltersStore from "../../store/DepartmentsFiltersStore";

const DepartmentsFilters = () => {
    return (
        <div>
            {/* <Checkbox onChange={() => filtersStore.vipOffice = !filtersStore.vipOffice}>VIP office</Checkbox> */}
            <Checkbox onChange={() => departmentsFiltersStore.officeType = !departmentsFiltersStore.officeType}>Прайм</Checkbox>
            <Checkbox onChange={() => departmentsFiltersStore.hasRamp = !departmentsFiltersStore.hasRamp}>Рампа</Checkbox>
        </div>
    );
};

export default DepartmentsFilters;