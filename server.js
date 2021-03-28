const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const routes = require('./routes.js');
const passport = require('passport');
const auth = require('./auth.js');
const { pool } = require('./database.js');
const { default: axios } = require('axios');

app.use(express.json());
app.use(express.static(__dirname + '/src'));
app.use('/api', routes);


// PASSPORT STUFF
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/fail' }),
    function(req, res) {
        console.log("Logged in")
        res.send(true);
    
    });


app.get('/fail', function(req, res) {
    res.send(false);
})

//checks if log in - returns true if logged in, false if not
app.get('/isLoggedIn', isLoggedIn, function(req, res) {
    res.send(true)
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

app.post('/test', function(req, res) {
    let geoapi = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}` +
                `%20${req.body.city}` +
                `%20${req.body.state}` +
                `%20${req.body.zip}` + 
                `&key=${process.env.GOOGLE_MAPS_API}`;

    console.log(req.body);
    console.log(req.body.newServices);

    axios.get(geoapi).then(function (response, body) {
        if (response.status == 200) {
        let geocoord = response.data.results[0].geometry.location;
          
        let queryServices = "";
        let queryLang = "";
        let queryPayment = "";
        let queryHours = "";
        
        let params = [req.body.clinicName, geocoord.lat, geocoord.lng, geocoord.lat, geocoord.lng,
                    req.body.clinicName, req.body.address, req.body.city, req.body.zip, req.body.phone];

        for (x in req.body.newServices) {
            queryServices += "INSERT INTO ClinicServices(clinic, services) VALUES (? ,?);\n";
            params.push(req.body.clinicName);
            params.push(x);
        }

        for (x in req.body.newLang) {
            queryLang += "INSERT INTO ClinicLanguage(clinic, language) VALUES (?, ?);\n";
            params.push(req.body.clinicName);
            params.push(x);
        }

        for (x in req.body.newPayment) {
            queryPayment += "INSERT INTO ClinicPayment(clinic, payment) VALUES (?, ?);\n";
            params.push(req.body.clinicName);
            params.push(x);
        }

        for (let i = 0; i < 7; i++) {
            queryHours += "INSERT INTO ClinicHours(clinic, day_of_week, hour_open, hour_close) VALUES (?, ?, ?, ?);\n";
            params.push(req.body.clinicName);
            params.push(i+1);
            params.push(req.body.openHours[i]);
            params.push(req.body.closeHours[i]);
        }
        let query = "START TRANSACTION;\n" +
                    "INSERT INTO ClinicCoords(clinic, longitude, latitude, coords) VALUES (?, ?, ?, POINT(?, ?));\n" +
                    "INSERT INTO ClinicAddress(clinic, address, city, zipcode, phone) VALUES (?, ?, ?, ?, ?);\n" + 
                    queryServices +
                    queryLang +
                    queryPayment +
                    queryHours +
                    "COMMIT;"
 
        console.log(query);
        
        /*
        pool.query(query, params, function (err, result) {
            if (err)
               throw err;

            res.send("Successfully added clinic");
          });
          */
      }
  });

})
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("logged in");
        return next();
    }

    console.log("not logged in");
    res.send(false);
}

// END PASSPORT STUFF

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

app.listen(process.env.PORT || '8080', () => console.log('Server is running on port 8080'))

