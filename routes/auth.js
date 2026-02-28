const express = require('express');
const passport = require('passport');
const { route } = require('./assignments');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure', successRedirect: '/auth/success' }));
router.get('/success', (req, res) => {
    res.json({ message: 'Authentication successful!', 
    user: req.user });
});
router.get('/failure', (req, res) => {
    res.status(401).json({ message: 'Authentication failed' });
});
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;
