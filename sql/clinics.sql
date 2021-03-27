-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: CLINICS
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ClinicAddress`
--

DROP TABLE IF EXISTS `ClinicAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `ClinicAddress` (
  `clinic` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  KEY `clinic` (`clinic`),
  CONSTRAINT `clinicaddress_ibfk_1` FOREIGN KEY (`clinic`) REFERENCES `ClinicCoords` (`clinic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClinicAddress`
--

LOCK TABLES `ClinicAddress` WRITE;
/*!40000 ALTER TABLE `ClinicAddress` DISABLE KEYS */;
INSERT INTO `ClinicAddress` VALUES ('UCSF','2977-2901 Folsom St','San Francisco','CA','90210','(415)123-4567'),('Clinic by the Bay','4877 Mission Street','San Francisco','CA','90210','415-405-0207'),('Free Health Clinic','12345 Arch Street','San Francisco','CA','90210','415-633-5345'),('Chung Health Clinic','645 Corona Road','San Francisco','CA','90210','415-644-2345'),('Jobs Health Clinic','645 Corona Road','San Francisco','CA','90210','415-644-2345'),('San Francisco Community Clinic Consortium','645 Corona Road','San Francisco','CA','90210','415-644-2345');
/*!40000 ALTER TABLE `ClinicAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClinicCoords`
--

DROP TABLE IF EXISTS `ClinicCoords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `ClinicCoords` (
  `clinic` varchar(255) NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `coords` point NOT NULL,
  PRIMARY KEY (`clinic`),
  SPATIAL KEY `sx_ClinicCoords_coords` (`coords`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClinicCoords`
--

LOCK TABLES `ClinicCoords` WRITE;
/*!40000 ALTER TABLE `ClinicCoords` DISABLE KEYS */;
INSERT INTO `ClinicCoords` VALUES ('Chung Health Clinic',37.7942,-122.435,_binary '\0\0\0\0\0\0\0\0\0\0@®\ÂB@\0\0\0 –õ^¿'),('Clinic by the Bay',37.7203,-122.438,_binary '\0\0\0\0\0\0\0\0\0\0`3\‹B@\0\0\0@ú^¿'),('Free Health Clinic',37.8034,-122.415,_binary '\0\0\0\0\0\0\0\0\0\0\0\’\ÊB@\0\0\0 àö^¿'),('Jobs Health Clinic',37.7793,-122.472,_binary '\0\0\0\0\0\0\0\0\0\0Äø\„B@\0\0\0`/û^¿'),('San Francisco Community Clinic Consortium',37.8073,-122.416,_binary '\0\0\0\0\0\0\0\0\0\0ÄU\ÁB@\0\0\0†òö^¿'),('UCSF',37.7502,-122.414,_binary '\0\0\0\0\0\0\0\0\0\0Ä\‡B@\0\0\0`wö^¿');
/*!40000 ALTER TABLE `ClinicCoords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClinicHours`
--

DROP TABLE IF EXISTS `ClinicHours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `ClinicHours` (
  `clinic` varchar(255) NOT NULL,
  `day_of_week` int NOT NULL,
  `hour_open` time NOT NULL,
  `hour_close` time NOT NULL,
  KEY `clinic` (`clinic`),
  CONSTRAINT `clinichours_ibfk_1` FOREIGN KEY (`clinic`) REFERENCES `ClinicCoords` (`clinic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClinicHours`
--

LOCK TABLES `ClinicHours` WRITE;
/*!40000 ALTER TABLE `ClinicHours` DISABLE KEYS */;
INSERT INTO `ClinicHours` VALUES ('UCSF',1,'08:00:00','18:00:00'),('UCSF',2,'08:00:00','18:00:00'),('UCSF',3,'08:00:00','18:00:00'),('UCSF',4,'08:00:00','18:00:00'),('UCSF',5,'08:00:00','18:00:00'),('UCSF',6,'08:00:00','18:00:00'),('UCSF',7,'08:00:00','18:00:00'),('Clinic by the Bay',1,'08:00:00','18:00:00'),('Clinic by the Bay',2,'08:00:00','18:00:00'),('Clinic by the Bay',3,'08:00:00','18:00:00'),('Clinic by the Bay',4,'08:00:00','18:00:00'),('Clinic by the Bay',5,'08:00:00','18:00:00'),('Clinic by the Bay',6,'08:00:00','18:00:00'),('Clinic by the Bay',7,'00:00:00','00:00:00'),('Free Health Clinic',1,'08:00:00','18:00:00'),('Free Health Clinic',2,'08:00:00','18:00:00'),('Free Health Clinic',3,'08:00:00','18:00:00'),('Free Health Clinic',4,'08:00:00','18:00:00'),('Free Health Clinic',5,'08:00:00','18:00:00'),('Free Health Clinic',6,'00:00:00','00:00:00'),('Free Health Clinic',7,'00:00:00','00:00:00');
/*!40000 ALTER TABLE `ClinicHours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClinicInsurance`
--

DROP TABLE IF EXISTS `ClinicInsurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `ClinicInsurance` (
  `clinic` varchar(255) NOT NULL,
  `insurance` varchar(255) NOT NULL,
  KEY `clinic` (`clinic`),
  CONSTRAINT `clinicinsurance_ibfk_1` FOREIGN KEY (`clinic`) REFERENCES `ClinicCoords` (`clinic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClinicInsurance`
--

LOCK TABLES `ClinicInsurance` WRITE;
/*!40000 ALTER TABLE `ClinicInsurance` DISABLE KEYS */;
INSERT INTO `ClinicInsurance` VALUES ('UCSF','Medicare'),('Clinic by the Bay','Medicare'),('Clinic by the Bay','Obamacare'),('Free Health Clinic','Medicare');
/*!40000 ALTER TABLE `ClinicInsurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClinicLanguage`
--

DROP TABLE IF EXISTS `ClinicLanguage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `ClinicLanguage` (
  `clinic` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  KEY `clinic` (`clinic`),
  CONSTRAINT `cliniclanguage_ibfk_1` FOREIGN KEY (`clinic`) REFERENCES `ClinicCoords` (`clinic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClinicLanguage`
--

LOCK TABLES `ClinicLanguage` WRITE;
/*!40000 ALTER TABLE `ClinicLanguage` DISABLE KEYS */;
INSERT INTO `ClinicLanguage` VALUES ('UCSF','English'),('Clinic by the Bay','English'),('Clinic by the Bay','Cantonese'),('Free Health Clinic','English'),('Free Health Clinic','Cantonese'),('Free Health Clinic','Vietnamese');
/*!40000 ALTER TABLE `ClinicLanguage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClinicTreatment`
--

DROP TABLE IF EXISTS `ClinicTreatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `ClinicTreatment` (
  `clinic` varchar(255) NOT NULL,
  `treatment` varchar(255) NOT NULL,
  KEY `clinic` (`clinic`),
  CONSTRAINT `clinictreatment_ibfk_1` FOREIGN KEY (`clinic`) REFERENCES `ClinicCoords` (`clinic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClinicTreatment`
--

LOCK TABLES `ClinicTreatment` WRITE;
/*!40000 ALTER TABLE `ClinicTreatment` DISABLE KEYS */;
INSERT INTO `ClinicTreatment` VALUES ('UCSF','Hepititus A'),('Clinic by the Bay','SARS'),('Clinic by the Bay','Coronavirus');
/*!40000 ALTER TABLE `ClinicTreatment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-02 15:43:40
