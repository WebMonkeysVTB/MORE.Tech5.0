import {makeAutoObservable} from "mobx";
import {IAtm} from "../types";


class AtmsStore {
    _data: IAtm[]

    constructor() {
        makeAutoObservable(this)
        this._data = []
    }

    set data(data) {
        this._data = data.map(el => {return{...el, type: "atm"}})
    }

    get data() {
        return this._data
    }

}

export default new AtmsStore()