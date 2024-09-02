const express = require('express')
const router = express.Router()

const { createDoctor, deleteDoctor, updateDoctor } = require('../../controllers/doctor')

router.route('/').post(createDoctor)
router.route('/:id').delete(deleteDoctor).patch(updateDoctor)

module.exports = router