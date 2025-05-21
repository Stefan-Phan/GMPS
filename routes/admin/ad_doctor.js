import { Router } from "express";
import doctorController from "../../controllers/doctor.js";

const router = Router();
const { createDoctor, deleteDoctor, updateDoctor } = doctorController;

router.route("/").post(createDoctor);
router.route("/:id").delete(deleteDoctor).patch(updateDoctor);

export default router;
