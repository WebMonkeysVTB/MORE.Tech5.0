import departmentsFiltersStore from "../store/DepartmentsFiltersStore";
import atmsFiltersStore from "../store/AtmsFiltersStore";
import atmsStore from "../store/AtmsStore";
import departmentsStore from "../store/DepartmentsStore";

const host = 'http://localhost:1234/'

async function fetchDepartments() {
    const url = new URL('http://localhost:1234/api/departments');
    if (departmentsFiltersStore.data.hasRamp) {
        url.searchParams.append('hasRamp', String(departmentsFiltersStore.data.hasRamp));
    }
    let response = await fetch(url);
    departmentsStore.data = await response.json();;
}

async function fetchAtms() {
    const url = new URL('http://localhost:1234/api/atms');
    if (atmsFiltersStore.data.wheelchair) {
        url.searchParams.append('wheelchair', String(atmsFiltersStore.data.wheelchair));
    }
    if (atmsFiltersStore.data.blind) {
        url.searchParams.append('blind', String(atmsFiltersStore.data.blind));
    }
    if (atmsFiltersStore.data.nfcForBankCards) {
        url.searchParams.append('nfcForBankCards', String(atmsFiltersStore.data.nfcForBankCards));
    }
    if (atmsFiltersStore.data.qrRead) {
        url.searchParams.append('qrRead', String(atmsFiltersStore.data.qrRead));
    }
    if (atmsFiltersStore.data.supportsUsd) {
        url.searchParams.append('supportsUsd', String(atmsFiltersStore.data.supportsUsd));
    }
    if (atmsFiltersStore.data.supportsChargeRub) {
        url.searchParams.append('supportsChargeRub', String(atmsFiltersStore.data.supportsChargeRub));
    }
    if (atmsFiltersStore.data.supportsEur) {
        url.searchParams.append('supportsEur', String(atmsFiltersStore.data.supportsEur));
    }
    if (atmsFiltersStore.data.supportsRub) {
        url.searchParams.append('supportsRub', String(atmsFiltersStore.data.supportsRub));
    }

    let response = await fetch(url);
    atmsStore.data = await response.json();
}

async function signUpQueue(kind: "department" | "atm", id: number) {
    let response;
    if (kind == "department") {
        response = await fetch(`${host}/api/queue/departments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({departmentId: id})
        })
    } else {
        response = await fetch(`${host}/api/queue/atms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({atmId: id})
        })
    }
    return response.status;
}

export {signUpQueue, fetchDepartments, fetchAtms}