import json
import os
import random
import sys
import time

import httpx
from sqlalchemy import update, select, or_
from sqlalchemy.exc import NoResultFound

sys.path.append(os.getcwd())

from config import VTB_URL
from models import Office, ATM, City
from database import sync_session



def parse_atms():
    with open('./services/vtb_parser/atms.txt', 'r', encoding='utf-8') as f:
        data = json.loads(f.read())
    atms = []
    str_to_bool = {'UNKNOWN': None, 'AVAILABLE': True, 'UNAVAILABLE': False}
    for atm in data['atms']:
        db_atm = ATM(
            address=atm['address'],
            latitude=atm['latitude'],
            longitude=atm['longitude'],
            allDay=atm['allDay'],
            wheelchair=str_to_bool[atm['services']['wheelchair']['serviceActivity']],
            blind=str_to_bool[atm['services']['blind']['serviceActivity']],
            nfcForBankCards=str_to_bool[atm['services']['nfcForBankCards']['serviceActivity']],
            qrRead=str_to_bool[atm['services']['qrRead']['serviceActivity']],
            supportsUsd=str_to_bool[atm['services']['supportsUsd']['serviceActivity']],
            supportsChargeRub=str_to_bool[atm['services']['supportsChargeRub']['serviceActivity']],
            supportsEur=str_to_bool[atm['services']['supportsEur']['serviceActivity']],
            supportsRub=str_to_bool[atm['services']['supportsRub']['serviceActivity']],
        )
        atms.append(db_atm)
    with sync_session() as db:
        db.add_all(atms)
        db.commit()


def parse_offices():
    with open('./services/vtb_parser/offices.txt', 'r', encoding='utf-8') as f:
        data = json.loads(f.read())
    db_offices = []
    y_n_to_bool = {'Y': True, 'N': False, None: None}
    CITIES = set()
    Cities = []
    for office in data:
        cities = office['address'].split(',')
        for c in cities:
            if ' г. ' in c:
                office['city'] = c[4::]
                CITIES.add(c[4::])
                break
            if 'г. ' in c:
                office['city'] = c[3::]
                CITIES.add(c[3::])
            else:
                office['city'] = None
        office['suoAvailability'] = y_n_to_bool[office['suoAvailability']]
        office['hasRamp'] = y_n_to_bool[office['hasRamp']]
        new_office = Office(
            salePointName=office['salePointName'],
            address=office['address'],
            city=office['city'],
            latitude=office['latitude'],
            longitude=office['longitude'],
            status=office['status'],
            openHours=office['openHours'],
            openHoursIndividual=office['openHoursIndividual'],
            rko=office['rko'],
            officeType=office['officeType'],
            salePointFormat=office['salePointFormat'],
            suoAvailability=office['suoAvailability'],
            hasRamp=office['hasRamp'],
            metroStation=office['metroStation']
        )
        db_offices.append(new_office)
    for c in CITIES:
        Cities.append(City(name=c))
    with sync_session() as db:
        db.begin()
        db.add_all(db_offices)
        db.add_all(Cities)
        db.commit()


if __name__ == '__main__':
    parse_atms()
    parse_offices()



