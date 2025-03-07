import fs from "fs";
import path from "path";

const appointmentsFilePath = path.join("data", "appointments.json");

// Helper function to read appointments from JSON
const readAppointments = () => {
    if (!fs.existsSync(appointmentsFilePath)) return [];
    const data = fs.readFileSync(appointmentsFilePath, "utf-8");
    return JSON.parse(data);
};

// Helper function to write appointments to JSON
const writeAppointments = (appointments) => {
    fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointments, null, 2));
};

// ✅ Book an Appointment
export const bookAppointment = (req, res) => {
    const { patientId, doctorId, date, time } = req.body;

    if (!patientId || !doctorId || !date || !time) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const appointments = readAppointments();
    const newAppointment = {
        id: appointments.length + 1,
        patientId,
        doctorId,
        date,
        time
    };

    appointments.push(newAppointment);
    writeAppointments(appointments);

    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
};

// ✅ Get Patient’s Appointments
export const getAppointmentsByPatient = (req, res) => {
    const { patientId } = req.params;
    const appointments = readAppointments();
    const patientAppointments = appointments.filter(app => app.patientId === patientId);

    res.json(patientAppointments);
};

// ✅ Cancel an Appointment (Patient Side)
export const cancelAppointment = (req, res) => {
    const { id } = req.params;
    let appointments = readAppointments();

    const initialLength = appointments.length;
    appointments = appointments.filter(app => app.id != id);

    if (appointments.length === initialLength) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    writeAppointments(appointments);
    res.json({ message: "Appointment cancelled successfully" });
};