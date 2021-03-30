const express = require('express');
const router = express.Router();
const axios = require('axios');
const { pool } = require('./database.js');
const { constructQuery } = require('./query.js');
require('dotenv').config()

//router.use(express.json());

// endpoint to get geocoordinates 
router.get('/searchClinics/address=:address&distance=:distance', function (req, res) {
	let geoapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.address}&key=${process.env.GOOGLE_MAPS_API}`;

	axios.get(geoapi).then(function (response, body) {
		if (response.status== 200) {
			let geocoord = response.data.results[0].geometry.location;		//holding tuple of geocoords
			let address = response.data.results[0].formatted_address;
			//TODO
			//Offensive coding: Make sure we get a "valid response"
			//Check for inputs, no street address etc., display the numbers correctly by searching for
			//numbers in the query.
			let query = constructQuery(geocoord.lat, geocoord.lng, req.body.filter, req.params.distance);
			pool.query(query, function(err, rows) {
				if (err)
				    throw err;
				
				let re = {
				    rows : rows,
				    geocoord : [geocoord.lng, geocoord.lat],
				    address: address,
				}
				res.send(re);				
			});	
		}
	});
});

// endpoint to filter clinics based on some set of parameters
router.post('/filterClinics', function(req, res) {
	let query = constructQuery(req.body.geocoord[1], req.body.geocoord[0], req.body.filter, req.body.distance);
	pool.query(query, function(err, rows) {

		if (err)
			throw err;
		let re = {
			rows: rows
		}
		res.send(re);
	})
});

// endpoint to get data for a specific clinic
router.get('/getClinicData/:clinic', function(req, res) {
	let query1 = `SELECT address, state, city, zipcode, phone, website, day_of_week, hour_open, hour_close, latitude, longitude`+ 
	` FROM ClinicAddress INNER JOIN ClinicHours ON ClinicHours.clinic = ClinicAddress.clinic ` +
	`INNER JOIN ClinicCoords ON ClinicCoords.clinic = ClinicAddress.clinic`+
	` WHERE ` + 
	`ClinicHours.clinic = '${req.params.clinic}';`
	let query2 = `SELECT services from ClinicServices WHERE clinic = '${req.params.clinic}';`;

	let query3 = `SELECT language from ClinicLanguage WHERE clinic= '${req.params.clinic}';`;

	let query4 = `SELECT payment from ClinicPayment WHERE clinic = '${req.params.clinic}';`;
	pool.query( query1 +  query2 + query3 + query4, function(err, rows) {
		if (err)
			throw err;

		let re = {
			rows: rows[0],
			services: rows[1],
			language: rows[2],
			payment: rows[3]
		};
		res.send(re);
	})
});	

//get endpoint, for all clinics
router.get("/getClinics", function(req, res) {
	let query = "SELECT DISTINCT clinic FROM ClinicAddress;"

	pool.query(query, function(err, rows) {
		if (err) 
			throw err;

		res.send({rows: rows});
	});
});


module.exports = router;
