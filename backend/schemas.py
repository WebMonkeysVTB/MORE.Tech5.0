import inspect
import uuid
from typing import Union, List, Literal

from fastapi import Depends
from pydantic import BaseModel, Json


# class AnonymousUser(BaseModel):
#     id: uuid.UUID | None = None
#     token: str | None = None


class BaseOffice(BaseModel):
    salePointName: str | None = None
    address: str | None = None
    city: str | None = None
    status: str | None = None
    openHours: Json | str | None = None
    openHoursIndividual: Json | str | None = None
    officeType: str | None = None
    salePointFormat: str | None = None
    suoAvailability: bool | None = None
    hasRamp: bool | None = None
    metroStation: str | None = None
    rko: str | None = None
    kep: bool | None = None


class Office(BaseOffice):
    id: int | None = None
    latitude: float | None = None
    longitude: float | None = None
    myBranch: bool | None = None


class BaseAtm(BaseModel):
    allDay: bool | None = None
    wheelchair: bool | None = None
    blind: bool | None = None
    nfcForBankCards: bool | None = None
    qrRead: bool | None = None
    supportsUsd: bool | None = None
    supportsChargeRub: bool | None = None
    supportsEur: bool | None = None
    supportsRub: bool | None = None


class Atm(BaseAtm):
    id: int = None
    address: str = None
    latitude: float = None
    longitude: float = None


class ItemTime(BaseModel):
    id: int
    timeInPath: int

#todo электронная очередь
#todo QRcode
#todo Ендпоинты для володи:
"""
post '/bank_queue<id>'
"""