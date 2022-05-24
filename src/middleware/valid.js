const mongoose = require('mongoose')
const userModel = require("../models/userModel")

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}


  const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


const isValidemail = function (email) {
    const regexForemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexForemail.test(email);
};

const validLogin = async function (req, res, next) {
    try {
        const queryParams = req.query;
        if (isValidRequestBody(queryParams)) {
            return res.status(400).send({ status: false, message: "invalid request" });
        }

        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "please provide input credentials" });
        }

        const userName = requestBody.email;
        if (!isValid(userName)) {
            return res.status(400).send({ status: false, message: "email is required" });
        }
        if (!isValidemail(userName)) {
            return res.status(400).send({ status: false, message: "please enter a valid email address" });
        }

        const password = requestBody.password;
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" });
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password)) {
            return res.status(400).send({ status: false, message: "password should be: 8 to 15 characters, at least one letter and one number " });
        }

        next();
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};


module.exports = {validLogin}