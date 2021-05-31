const express = require('express')
const controller = require('../controllers/position')
// const passport = require('passport')
const router = express.Router()

router.get('/:categoryId', controller.getByCatforId)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router