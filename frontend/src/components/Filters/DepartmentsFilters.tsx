import React from 'react';
import {Checkbox} from "antd";
import departmentsFiltersStore from "../../store/DepartmentsFiltersStore";
import { observer } from 'mobx-react-lite';

const DepartmentsFilters = observer(() => {
    return (
        <div>
            {/* <Checkbox onChange={() => departmentsFiltersStore.officeType = !departmentsFiltersStore.officeType}>Прайм</Checkbox> */}
            <Checkbox onChange={() => departmentsFiltersStore.hasRamp = !departmentsFiltersStore.hasRamp}>Рампа</Checkbox>
        </div>
    );
});

export default DepartmentsFilters;