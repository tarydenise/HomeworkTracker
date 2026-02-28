const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connect');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const users = getDB().collection('users');
            
            // Check if user already exists
            let user = await users.findOne({ googleId: profile.id });
            
            // If not, create a new user
            if (!user) {
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                };

                const result = await users.insertOne(newUser);
                user = { _id: result.insertedId, ...newUser };
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

// Store user ID in session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Retrieve user from session
passport.deserializeUser(async (id, done) => {
    try {
        const db = getDB();
        const users = db.collection('users');
        const user = await users.findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;