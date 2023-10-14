from sqlalchemy import MetaData, BigInteger, Column, String, JSON, PrimaryKeyConstraint, \
    Float, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base(metadata=MetaData())


class Office(Base):
    __tablename__ = 'offices'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    salePointName = Column(String(255))
    address = Column(String(400))
    city = Column(String(255), nullable=True)
    status = Column(String(255), nullable=True)
    openHours = Column(JSON, nullable=True)
    openHoursIndividual = Column(JSON, nullable=True)
    rko = Column(String(255), nullable=True)
    officeType = Column(String(255), nullable=True)
    salePointFormat = Column(String(255), nullable=True)
    suoAvailability = Column(Boolean, nullable=True)
    hasRamp = Column(Boolean, nullable=True)
    latitude = Column(Float)
    longitude = Column(Float)
    metroStation = Column(String(500), nullable=True)
    myBranch = Column(Boolean, nullable=True)
    kep = Column(Boolean, nullable=True)


class ATM(Base):
    __tablename__ = 'atms'

    id = Column(BigInteger, primary_key=True, autoincrement=True)

    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    allDay = Column(Boolean)
    wheelchair = Column(Boolean, nullable=True)
    blind = Column(Boolean, nullable=True)
    nfcForBankCards = Column(Boolean, nullable=True)
    qrRead = Column(Boolean, nullable=True)
    supportsUsd = Column(Boolean, nullable=True)
    supportsChargeRub = Column(Boolean, nullable=True)
    supportsChargeRub = Column(Boolean, nullable=True)
    supportsEur = Column(Boolean, nullable=True)
    supportsRub = Column(Boolean, nullable=True)


