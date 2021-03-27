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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClinicCoords`
--

LOCK TABLES `ClinicCoords` WRITE;
/*!40000 ALTER TABLE `ClinicCoords` DISABLE KEYS */;
