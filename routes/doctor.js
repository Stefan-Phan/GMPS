const express = require('express')
const router = express.Router()

const {getAllDoctors, getDoctor} = require('../controllers/doctor')

router.route('/').get(getAllDoctors)
router.route('/:id').get(getDoctor)

module.exports = router