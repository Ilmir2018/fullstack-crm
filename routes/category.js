const express = require('express')
// const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/category')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.delete)
router.post('/', upload.single('image'), controller.create)
router.patch('/:id', upload.single('image'), controller.update)

module.exports = router