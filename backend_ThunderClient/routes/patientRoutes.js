import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const patientsFilePath = path.resolve("data/patients.json");

// Get patient profile by ID
router.get("/profile/:id", (req, res) => {
  const patientId = req.params.id;
  fs.readFile(patientsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading patients data" });
    }
    const patients = JSON.parse(data);
    const patient = patients.find((pat) => pat._id === patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  });
});

// Update patient profile by ID
router.put("/profile/:id", (req, res) => {
    const patientId = req.params.id;
    const { name, age, gender, phone } = req.body;
  
    fs.readFile(patientsFilePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading patients data" });
      }
  
      let patients = JSON.parse(data);
      const patientIndex = patients.findIndex((pat) => pat._id === patientId);
  
      if (patientIndex === -1) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      // Update only the provided fields
      if (name) patients[patientIndex].name = name;
      if (age) patients[patientIndex].age = age;
      if (gender) patients[patientIndex].gender = gender;
      if (phone) patients[patientIndex].phone = phone;
  
      fs.writeFile(patientsFilePath, JSON.stringify(patients, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error updating patient profile" });
        }
        res.json({ message: "Profile updated successfully", patient: patients[patientIndex] });
      });
    });
  });  

export default router;