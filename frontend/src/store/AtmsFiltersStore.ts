import {Special} from "../types";
import {makeAutoObservable} from "mobx";


class DepartmentsFiltersStore {
    data: {
        wheelchair: boolean
        blind: boolean
        nfcForBankCards: boolean
        qrRead: boolean
        supportsUsd: boolean
        supportsChargeRub: boolean
        supportsEur: boolean
        supportsRub: boolean
    }

    constructor() {
        makeAutoObservable(this);
        this.data = {
            wheelchair: false,
            blind: false,
            nfcForBankCards: false,
            qrRead: false,
            supportsUsd: false,
            supportsChargeRub: false,
            supportsEur: false,
            supportsRub: false
        }
    }

    set wheelchair(wheelchair: boolean) {
        this.data = {...this.data}
        this.data.wheelchair = wheelchair
    }

    get wheelchair() {
        return this.data.wheelchair
    }

    set blind(blind: boolean) {
        this.data = {...this.data}
        this.data.blind = blind
    }

    get blind() {
        return this.data.blind
    }

    set nfcForBankCards(nfcForBankCards: boolean) {
        this.data = {...this.data}
        this.data.nfcForBankCards = nfcForBankCards
    }

    get nfcForBankCards() {
        return this.data.nfcForBankCards
    }

    set qrRead(qrRead: boolean) {
        this.data = {...this.data}
        this.data.qrRead = qrRead
    }

    get qrRead() {
        return this.data.qrRead
    }

    set supportsUsd(supportsUsd: boolean) {
        this.data = {...this.data}
        this.data.supportsUsd = supportsUsd
    }

    get supportsUsd() {
        return this.data.supportsUsd
    }

    set supportsChargeRub(supportsChargeRub: boolean) {
        this.data = {...this.data}
        this.data.supportsChargeRub = supportsChargeRub
    }

    get supportsChargeRub() {
        return this.data.supportsChargeRub
    }
    set supportsEur(supportsEur: boolean) {
        this.data = {...this.data}
        this.data.supportsEur = supportsEur
    }

    get supportsEur() {
        return this.data.supportsEur
    }
    set supportsRub(supportsRub: boolean) {
        this.data = {...this.data}
        this.data.supportsRub = supportsRub
    }

    get supportsRub() {
        return this.data.supportsRub
    }

}

export default new DepartmentsFiltersStore()