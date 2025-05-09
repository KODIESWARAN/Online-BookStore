const express = require('express')
const {signup , login , logout , checkAuth} = require('../authentication/authController')
const router = express.Router()
const {authenticationJwt} = require('../middleware/authmiddlware')




router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/check', authenticationJwt, checkAuth);

module.exports = router