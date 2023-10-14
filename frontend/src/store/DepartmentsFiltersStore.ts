import {Special} from "../types";
import {makeAutoObservable} from "mobx";

class DepartmentsFiltersStore {
    data: {
        // officeType: boolean
        hasRamp: boolean
    }

    constructor() {
        makeAutoObservable(this);
        this.data = {
            // officeType: false,
            hasRamp: false,
        }
    }

    // set officeType(officeType: boolean) {
    //     this.data = {...this.data}
    //     this.data.officeType = officeType
    // }

    // get officeType() {
    //     return this.data.officeType
    // }

    set hasRamp(hasRamp: boolean) {
        this.data = {...this.data}
        this.data.hasRamp = hasRamp
    }

    get hasRamp() {
        return this.data.hasRamp
    }
}

export default new DepartmentsFiltersStore()