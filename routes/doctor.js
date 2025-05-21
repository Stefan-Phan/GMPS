import { Router } from "express";
import doctorController from "../controllers/doctor.js";

const router = Router();
const { getAllDoctors, getDoctor } = doctorController;

router.route("/").get(getAllDoctors);
router.route("/:id").get(getDoctor);

export default router;
