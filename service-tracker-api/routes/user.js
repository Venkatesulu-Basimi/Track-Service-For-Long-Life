const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/user')

const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');;

async function registerUser(req, res) {
    try {
        const data = req.body;
        const { error, value } = registerSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await register(data);
        res.status(result.statusCode);
        res.send(result.message);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function loginUser(req, res) {
    try {
        const data = req.body;
        const { error, value } = userSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await login(data);
        res.status(result.statusCode);
        res.send(result.message);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = exports = {
    registerUser,
    loginUser
};