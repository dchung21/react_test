CREATE DATABASE IF NOT EXISTS Clinics;
USING Clinics;
DROP TABLE IF EXISTS ClinicAddress, ClinicCoords, ClinicHours, ClinicInsurance, ClinicTreatment;
CREATE TABLE ClinicCoords(
	clinic VARCHAR(255) PRIMARY KEY NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL
);

CREATE TABLE ClinicAddress(
	clinic VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    zipcode VARCHAR(5) NOT NULL,
    phone VARCHAR(255),
    FOREIGN KEY(Clinic) REFERENCES ClinicCoords(Clinic)
);

CREATE TABLE ClinicHours(
	clinic VARCHAR(255) NOT NULL,
    day_of_week INT NOT NULL,
    hour_open TIME NOT NULL,
    hour_close TIME NOT NULL,
	FOREIGN KEY(Clinic) REFERENCES ClinicCoords(Clinic)
);

CREATE TABLE ClinicInsurance(
	clinic VARCHAR(255) NOT NULL,
    insurance VARCHAR(255) NOT NULL, 
    FOREIGN KEY(Clinic) REFERENCES ClinicCoords(Clinic)
);

CREATE TABLE ClinicTreatment(
	clinic VARCHAR(255) NOT NULL,
    treatment VARCHAR(255) NOT NULL,
    FOREIGN KEY(Clinic) REFERENCES ClinicCoords(Clinic)
);

CREATE TABLE ClinicLanguage(
	clinic VARCHAR(255) NOT NULL,
    language VARCHAR(255) NOT NULL,
    FOREIGN KEY(Clinic) REFERENCES ClinicCoords(Clinic)
);