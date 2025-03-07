import express from "express";
import { bookAppointment, getAppointmentsByPatient, cancelAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", bookAppointment); // Book an appointment
router.get("/:patientId", getAppointmentsByPatient); // Get patient's appointments
router.delete("/:id", cancelAppointment); // Cancel an appointment

export default router;