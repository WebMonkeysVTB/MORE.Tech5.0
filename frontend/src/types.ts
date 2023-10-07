export type Special = {
  "vipZone": boolean;
  "vipOffice": boolean;
  "ramp": boolean;
  "person": boolean;
  "juridical": boolean;
  "prime": boolean
}

export type Department = {
    "id": number | string;
    "Biskvit_id": number | string;
    "shortName": string;
    "address": string;
    "city": string;
    "scheduleFl": string;
    "scheduleJurL": string;
    "special": Special;
    "workload"?: string;
    "coordinates": {
      "latitude": number | string;
      "longitude": number | string;
    }
};