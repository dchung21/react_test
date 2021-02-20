const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const routes = require('./routes.js');
const passport = require('passport');
const auth = require('./auth.js');

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
	  res.send(true);
  });

app.get('/fail', function(req, res) {
	res.send(false);
})

app.get('/testing', isLoggedIn, function(req, res) {
    res.send("logged in");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("logged in");
        return next();
    }

    console.log("not logged in");
    res.send("not logged in");
}

// END PASSPORT STUFF

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

app.listen(process.env.PORT || '8080', () => console.log('Server is running on port 8080'))

