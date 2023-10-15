import {makeAutoObservable} from "mobx";

class CoordsStore {

    _coords: number[]

    constructor() {
        makeAutoObservable(this)
        this._coords = [55.76, 37.64]
    }

    get coords() {
        return this._coords
    }

    set coords(coords) {
        this._coords = [...coords]
    }

}

export default new CoordsStore()