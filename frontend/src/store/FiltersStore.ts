import {Special} from "../types";
import {makeAutoObservable} from "mobx";



class FiltersStore implements Special{
    vipZone: boolean
    vipOffice: boolean
    ramp: boolean
    prime: boolean
    person: boolean
    juridical: boolean

    constructor() {
        makeAutoObservable(this);
        this.vipZone = false;
        this.vipOffice = false;
        this.ramp = false;
        this.prime = false;
        this.person = false;
        this.juridical = false;
    }

}

export default new FiltersStore()