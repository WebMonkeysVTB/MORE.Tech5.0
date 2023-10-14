BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> 9515d9a02546

CREATE TABLE atms (
    id BIGSERIAL NOT NULL, 
    address VARCHAR, 
    latitude FLOAT, 
    longitude FLOAT, 
    "allDay" BOOLEAN, 
    wheelchair BOOLEAN, 
    blind BOOLEAN, 
    "nfcForBankCards" BOOLEAN, 
    "qrRead" BOOLEAN, 
    "supportsUsd" BOOLEAN, 
    "supportsChargeRub" BOOLEAN, 
    "supportsEur" BOOLEAN, 
    "supportsRub" BOOLEAN, 
    PRIMARY KEY (id)
);

CREATE TABLE offices (
    id BIGSERIAL NOT NULL, 
    "salePointName" VARCHAR(255), 
    address VARCHAR(400), 
    city VARCHAR(255), 
    status VARCHAR(255), 
    "openHours" JSON, 
    "openHoursIndividual" JSON, 
    rko VARCHAR(255), 
    "officeType" VARCHAR(255), 
    "salePointFormat" VARCHAR(255), 
    "suoAvailability" BOOLEAN, 
    "hasRamp" BOOLEAN, 
    latitude FLOAT, 
    longitude FLOAT, 
    "metroStation" VARCHAR(500), 
    "myBranch" BOOLEAN, 
    kep BOOLEAN, 
    PRIMARY KEY (id)
);

INSERT INTO alembic_version (version_num) VALUES ('9515d9a02546') RETURNING alembic_version.version_num;

COMMIT;

