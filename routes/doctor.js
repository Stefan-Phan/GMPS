const express = require("express");
const router = express.Router();

const {
    getAllDoctor,
    getDoctor,
    createDoctor,
    deleteDoctor,
    updateDoctor,
} = require("../controllers/doctor");

const auth = require('../middleware/authentication')

// get all doctors
router.get("/", getAllDoctor);

// create doctor
router.post("/", auth, createDoctor);

// get single doctor
router.get("/:id", getDoctor);

//update doctor
router.put("/:id", auth, updateDoctor);

// delete doctor
router.delete("/:id", auth, deleteDoctor);

module.exports = router;
