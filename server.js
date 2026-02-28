require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db/connect');
const assignmentRoutes = require('./routes/assignments');
const swagger = require('./swagger/swagger');
const app = express();
const session = require('express-session');
const passport = require('passport');
require('./auth/passport');

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

swagger(app);

app.use("/auth", require('./routes/auth'));
app.use('/assignments', assignmentRoutes);

connectToDB().then(() => {
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
});