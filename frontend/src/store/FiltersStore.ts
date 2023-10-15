
import {makeAutoObservable} from "mobx";


class FiltersStore {

    data: {
        vipZone: boolean
        vipOffice: boolean
        ramp: boolean
        Prime: boolean
        person: boolean
        juridical: boolean
    }

    constructor() {
        makeAutoObservable(this);
        this.data = {
            vipZone: false,
            vipOffice: false,
            ramp: false,
            Prime: false,
            person: false,
            juridical: false,
        }
    }

    set vipZone(vipZone: boolean) {
        this.data = {...this.data}
        this.data.vipZone = vipZone
    }

    get vipZone() {
        return this.data.vipZone
    }

    set vipOffice(vipOffice: boolean) {
        this.data = {...this.data}
        this.data.vipOffice = vipOffice
    }

    get vipOffice() {
        return this.data.vipOffice
    }

    set ramp(ramp: boolean) {
        this.data = {...this.data}
        this.data.ramp = ramp
    }

    get ramp() {
        return this.data.ramp
    }

    set Prime(Prime: boolean) {
        this.data = {...this.data}
        this.data.Prime = Prime
    }

    get Prime() {
        return this.data.Prime
    }

    set person(person: boolean) {
        this.data = {...this.data}
        this.data.person = person
    }

    get person() {
        return this.data.person
    }

    set juridical(juridical: boolean) {
        this.data = {...this.data}
        this.data.juridical = juridical
    }

    get juridical() {
        return this.data.juridical
    }

}

export default new FiltersStore()