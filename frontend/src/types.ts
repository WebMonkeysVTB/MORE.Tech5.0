

export interface IDepartment {
    type: "department" | "atm";
    "id": number | string;
    salePointName: string;
    address: string;
    city: string;
    status: string;
    openHours: string;
    openHoursIndividual: string;
    rko: string;
    officeType: string;
    salePointFormat: string;
    suoAvailability: boolean;
    hasRamp: boolean;
    latitude: number;
    longitude: number;
    metroStation: string;
    myBranch: boolean;
    kep: boolean;
}


export interface IAtm  {
    type: "department" | "atm";
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    allDay: boolean;
    wheelchair: boolean;
    blind: boolean;
    nfcForBankCards: boolean;
    qrRead: boolean;
    supportsUsd: boolean;
    supportsChargeRub: boolean;
    supportsEur: boolean;
    supportsRub: boolean;
}

