const express = require('express')
const controller = require('../controllers/order')
const router = express.Router()
// const passport = require('passport')s

router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router