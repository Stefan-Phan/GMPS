import { Router } from "express";
const router = Router();

import doctorController from "../../controllers/doctor.js";

const { createDoctor, deleteDoctor, updateDoctor } = doctorController;

router.route("/").post(createDoctor);
router.route("/:id").delete(deleteDoctor).patch(updateDoctor);

export default router;
