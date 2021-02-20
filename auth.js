const saltRounds = 10;
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt")
const { pool } = require('./database.js');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    function(username, password, cb) {
       pool.query("SELECT * FROM USERS WHERE username=?", [username], function(err, rows) {
            if (err)
                return cb(err);

            if (!rows.length) 
                return cb(null, false);
            /*
            bcrypt.hash(password, saltRounds, function(err, hash) {
                console.log("updating");
                pool.query(`UPDATE USERS SET password="${hash}";`, function(err, row) {
                    console.log(err);
                });
            });
            */
            console.log("contacted database")
            bcrypt.compare(password, rows[0].password, function(err, result) {
                //if result is false, invalid password
                if (!result)
                    return cb(null, false);

                    
                return cb(null, rows[0]);
            });
        })
    }));

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    pool.query("SELECT * FROM USERS WHERE id = ? ", [id], function(err, rows) {
        cb(err, rows[0]);
    });
  });

