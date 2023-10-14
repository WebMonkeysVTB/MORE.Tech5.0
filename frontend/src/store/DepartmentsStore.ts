import {makeAutoObservable} from "mobx";
import {IDepartment} from "../types";


class DepartmentsStore {

    _data: IDepartment[]

    constructor() {
        makeAutoObservable(this)
        this._data = []
    }

    set data(data) {
        this._data = data.map(el => {return{...el, type: "department"}})
    }

    get data() {
        return this._data
    }

}

export default new DepartmentsStore()