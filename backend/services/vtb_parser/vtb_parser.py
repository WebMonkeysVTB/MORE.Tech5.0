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
from models import Office, ATM
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
    for office in data:
        cities = office['address'].split(',')
        for c in cities:
            if ' г. ' in c:
                office['city'] = c[4::]
                break
            if 'г. ' in c:
                office['city'] = c[3::]
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
    with sync_session() as db:
        db.begin()
        db.add_all(db_offices)
        db.commit()


def parse_extra_data():
    with open('./services/vtb_parser/offices.txt', 'r', encoding='utf-8') as f:
        data = json.loads(f.read())
    y_n_to_bool = {'Y': True, 'N': False, None: None}

    for office in data:

        office['suoAvailability'] = y_n_to_bool[office['suoAvailability']]
        office['hasRamp'] = y_n_to_bool[office['hasRamp']]
        print(office['address'])
        print(office['salePointName'])
        query = select(Office).where(or_(Office.address==office['address'],
                                     Office.shortName == office['salePointName']))


        print(query)
        with sync_session() as db:
            try:
                ex_office = db.execute(query).scalars().first()
                if ex_office is None:
                    raise NoResultFound
                db.execute(
                    update(Office),
                    [
                        {
                            "id": ex_office.id,
                            "Biskvit_id": ex_office.Biskvit_id,
                            "status": office['status'],
                            "openHours": office['openHours'],
                            "openHoursIndividual": office['openHoursIndividual'],
                            "rko": office['rko'],
                            "officeType": office['officeType'],
                            "salePointFormat": office['salePointFormat'],
                            "suoAvailability": office['suoAvailability'],
                            "hasRamp": office['hasRamp'],
                            "metroStation": office['metroStation']
                        }
                    ]
                )
                db.commit()
            except NoResultFound:
                cities = office['address'].split(',')
                for c in cities:
                    if 'г. ' in c:
                        office['city'] = c
                        break
                    else:
                        office['city'] = 'г. Жопа'
                schedule = ''
                if len(office['openHours']) == 1:
                    office['scheduleJurL'] = 'Не обслуживает ЮЛ'
                else:
                    for sch in office['openHours']:
                        schedule += f"{sch['days']}: {sch['hours']}, "
                    office['scheduleJurL'] = schedule
                schedule = ''
                if len(office['openHoursIndividual']) == 1:
                    office['scheduleFl'] = 'Не обслуживает ФЛ'
                else:
                    for sch in office['openHoursIndividual']:
                        schedule += f"{sch['days']}: {sch['hours']}, "
                    office['scheduleFl'] = schedule

                new_office = Office(
                    id=random.randint(1000000, 50000000),
                    Biskvit_id=str(random.randint(1, 9)*10000 + random.randint(0, 9999)),
                    shortName=office['salePointName'],
                    address=office['address'],
                    city=office['city'],
                    scheduleFl=office['scheduleFl'],
                    scheduleJurL=office['scheduleJurL'],
                    special={'info': 'unknown'},
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
                db.add(new_office)
                db.commit()



if __name__ == '__main__':
    parse_atms()
    parse_offices()



