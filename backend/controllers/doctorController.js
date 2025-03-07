// const fs = require('fs');
// const path = require('path');

// const doctorsFilePath = path.join(__dirname, '../data/doctors.json');

// // Helper function to read doctors data
// const readDoctors = () => {
//     const data = fs.readFileSync(doctorsFilePath);
//     return JSON.parse(data);
// };

// // Helper function to write doctors data
// const writeDoctors = (data) => {
//     fs.writeFileSync(doctorsFilePath, JSON.stringify(data, null, 2));
// };

// // Get all doctors
// const getAllDoctors = (req, res) => {
//     try {
//         const doctors = readDoctors();
//         res.json(doctors);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching doctors' });
//     }
// };

// // Get a single doctor by ID
// const getDoctorById = (req, res) => {
//     try {
//         const doctors = readDoctors();
//         const doctor = doctors.find(doc => doc.id === req.params.id);
//         if (!doctor) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
//         res.json(doctor);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching doctor' });
//     }
// };

// // Add a new doctor
// const addDoctor = (req, res) => {
//     try {
//         const doctors = readDoctors();
//         const newDoctor = { id: Date.now().toString(), ...req.body };
//         doctors.push(newDoctor);
//         writeDoctors(doctors);
//         res.status(201).json(newDoctor);
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding doctor' });
//     }
// };

// // Update a doctor's details
// const updateDoctor = (req, res) => {
//     try {
//         let doctors = readDoctors();
//         const index = doctors.findIndex(doc => doc.id === req.params.id);
//         if (index === -1) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
//         doctors[index] = { ...doctors[index], ...req.body };
//         writeDoctors(doctors);
//         res.json(doctors[index]);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating doctor' });
//     }
// };

// // Delete a doctor
// const deleteDoctor = (req, res) => {
//     try {
//         let doctors = readDoctors();
//         const newDoctors = doctors.filter(doc => doc.id !== req.params.id);
//         if (doctors.length === newDoctors.length) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
//         writeDoctors(newDoctors);
//         res.json({ message: 'Doctor deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting doctor' });
//     }
// };

// module.exports = {
//     getAllDoctors,
//     getDoctorById,
//     addDoctor,
//     updateDoctor,
//     deleteDoctor
// };