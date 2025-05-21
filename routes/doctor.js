import { Router } from "express";
const router = Router();

import doctorController from "../controllers/doctor.js";

const { getAllDoctors, getDoctor } = doctorController;

router.route("/").get(getAllDoctors);
router.route("/:id").get(getDoctor);

export default router;
