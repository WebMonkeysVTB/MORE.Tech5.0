import React from 'react';
import {Checkbox} from "antd";
import atmsFiltersStore from "../../store/AtmsFiltersStore";

const AtmsFilters = () => {
    return (
        <div>
            <Checkbox onChange={() => atmsFiltersStore.wheelchair = !atmsFiltersStore.wheelchair}>Коляска</Checkbox>
            <Checkbox onChange={() => atmsFiltersStore.blind = !atmsFiltersStore.blind}>Незрячие</Checkbox>
            <Checkbox onChange={() => atmsFiltersStore.nfcForBankCards = !atmsFiltersStore.nfcForBankCards}>NFC</Checkbox>
            <Checkbox onChange={() => atmsFiltersStore.qrRead = !atmsFiltersStore.qrRead}>QR-код</Checkbox>
            <Checkbox onChange={() => atmsFiltersStore.supportsUsd = !atmsFiltersStore.supportsUsd}>USD</Checkbox>
            <Checkbox onChange={() => atmsFiltersStore.supportsChargeRub = !atmsFiltersStore.supportsChargeRub}>Charge RUB</Checkbox>
            <Checkbox onChange={() => atmsFiltersStore.supportsEur = !atmsFiltersStore.supportsEur}>EUR</Checkbox>
            <Checkbox onChange={() => atmsFiltersStore.supportsRub = !atmsFiltersStore.supportsRub}>Charge RUB</Checkbox>
        </div>
    );
};

export default AtmsFilters;