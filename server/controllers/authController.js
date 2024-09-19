const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login, logout, updateUser, profileInfo } = require('../services/userService');
const {parseError} = require('../util/parser');
const { hasUser } = require('../middlewares/guards');

authController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const token = await register(req.body.email, req.body.password);
            res.json(token);
        } catch (error) { 
            const message = parseError(error);
            res.status(400).json({ message });
        }
    });

authController.post('/login',
    body('email').trim().isEmail().withMessage('Please enter valid email'),
    body('password').trim().isLength({min: 3}).withMessage('Password must be at least 3 characters long '),
    async (req, res) => {
    try {        
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({message});
    }
});

authController.put('/update', hasUser(),
    async (req, res) => {
        console.log(req.body);
        
        const data = Object.fromEntries(Object.entries(req.body.userData).filter(value => value[1]));        
    try {    
        const tokenUpdate = await updateUser(req.body.id, data);
        res.json(tokenUpdate);
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({message});
    }
});

authController.get('/profile', hasUser(),
    async (req, res) => {     
        try {    
            const id = req.query.id || req.user._id; 
            const userInfo = await profileInfo(id);
            if (!userInfo) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(userInfo);
        } catch (err) {
            console.error('Error fetching user profile', err);
            res.status(500).json({ message: 'Server error' });
        }
    });

authController.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).end();
});

module.exports = authController;