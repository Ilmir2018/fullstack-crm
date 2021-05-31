const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()
// const passport = require('passport')

router.get('/overview', controller.overview)

router.get('/analytics', controller.analytics)

module.exports = router