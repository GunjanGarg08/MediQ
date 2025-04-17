import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const doctorsFilePath = path.resolve("data/doctors.json");

// ✅ Get all doctors
router.get("/", (req, res) => {
  fs.readFile(doctorsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading doctors data" });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ Get a single doctor by ID
router.get("/:id", (req, res) => {
  const doctorId = req.params.id;
  fs.readFile(doctorsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading doctors data" });
    }
    const doctors = JSON.parse(data);
    const doctor = doctors.find((doc) => doc._id === doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  });
});

// ✅ Add a new doctor
router.post("/", (req, res) => {
  fs.readFile(doctorsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading doctors data" });
    }

    const doctors = JSON.parse(data);
    const newDoctor = req.body;

    // Ensure the new doctor has a unique ID
    newDoctor._id = `doc${doctors.length + 1}`;
    
    doctors.push(newDoctor);

    fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving doctor data" });
      }
      res.status(201).json(newDoctor);
    });
  });
});

// ✅ Update an existing doctor by ID
router.put("/:id", (req, res) => {
  const doctorId = req.params.id;
  const updatedData = req.body;

  fs.readFile(doctorsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading doctors data" });
    }

    let doctors = JSON.parse(data);
    const doctorIndex = doctors.findIndex((doc) => doc._id === doctorId);

    if (doctorIndex === -1) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update doctor data
    doctors[doctorIndex] = { ...doctors[doctorIndex], ...updatedData };

    fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating doctor data" });
      }
      res.json(doctors[doctorIndex]);
    });
  });
});

// ✅ Delete a doctor by ID
router.delete("/:id", (req, res) => {
  const doctorId = req.params.id;

  fs.readFile(doctorsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading doctors data" });
    }

    let doctors = JSON.parse(data);
    const filteredDoctors = doctors.filter((doc) => doc._id !== doctorId);

    if (doctors.length === filteredDoctors.length) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    fs.writeFile(doctorsFilePath, JSON.stringify(filteredDoctors, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting doctor data" });
      }
      res.json({ message: "Doctor deleted successfully" });
    });
  });
});

export default router;



// import express from "express";
// import fs from "fs";
// import path from "path";

// const router = express.Router();
// const doctorsFilePath = path.resolve("data/doctors.json");

// // ✅ Get all doctors
// router.get("/", (req, res) => {
//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // ✅ Get a single doctor by ID
// router.get("/:id", (req, res) => {
//   const doctorId = req.params.id;
//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }
//     const doctors = JSON.parse(data);
//     const doctor = doctors.find((doc) => doc._id === doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }
//     res.json(doctor);
//   });
// });

// // ✅ Add a new doctor
// router.post("/", (req, res) => {
//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }

//     const doctors = JSON.parse(data);
//     const newDoctor = req.body;

//     // Ensure the new doctor has a unique ID
//     newDoctor._id = `doc${doctors.length + 1}`;
    
//     doctors.push(newDoctor);

//     fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error saving doctor data" });
//       }
//       res.status(201).json(newDoctor);
//     });
//   });
// });

// // ✅ Update an existing doctor by ID
// router.put("/:id", (req, res) => {
//   const doctorId = req.params.id;
//   const updatedData = req.body;

//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }

//     let doctors = JSON.parse(data);
//     const doctorIndex = doctors.findIndex((doc) => doc._id === doctorId);

//     if (doctorIndex === -1) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     // Update doctor data
//     doctors[doctorIndex] = { ...doctors[doctorIndex], ...updatedData };

//     fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error updating doctor data" });
//       }
//       res.json(doctors[doctorIndex]);
//     });
//   });
// });

// // ✅ Delete a doctor by ID
// router.delete("/:id", (req, res) => {
//   const doctorId = req.params.id;

//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }

//     let doctors = JSON.parse(data);
//     const filteredDoctors = doctors.filter((doc) => doc._id !== doctorId);

//     if (doctors.length === filteredDoctors.length) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     fs.writeFile(doctorsFilePath, JSON.stringify(filteredDoctors, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error deleting doctor data" });
//       }
//       res.json({ message: "Doctor deleted successfully" });
//     });
//   });
// });

// export default router;


// import express from "express";
// import fs from "fs";
// import path from "path";

// const router = express.Router();
// const doctorsFilePath = path.resolve("data/doctors.json");

// // Function to read doctors' data
// const getDoctorsData = () => {
//   const data = fs.readFileSync(doctorsFilePath, "utf8");
//   return JSON.parse(data);
// };

// // Function to write doctors' data
// const saveDoctorsData = (data) => {
//   fs.writeFileSync(doctorsFilePath, JSON.stringify(data, null, 2), "utf8");
// };

// // Add a new doctor
// router.post("/", (req, res) => {
//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }

//     const doctors = JSON.parse(data);
//     const newDoctor = req.body; // Getting data from request body

//     // Ensure the new doctor has a unique ID
//     newDoctor._id = `doc${doctors.length + 1}`;
    
//     doctors.push(newDoctor);

//     fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error saving doctor data" });
//       }
//       res.status(201).json(newDoctor);
//     });
//   });
// });

// export default router;

// import express from "express";
// import fs from "fs";
// import path from "path";

// const router = express.Router();
// const doctorsFilePath = path.resolve("data/doctors.json");

// // Get all doctors
// router.get("/", (req, res) => {
//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Get a single doctor by ID
// router.get("/:id", (req, res) => {
//   const doctorId = req.params.id;
//   fs.readFile(doctorsFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: "Error reading doctors data" });
//     }
//     const doctors = JSON.parse(data);
//     const doctor = doctors.find((doc) => doc._id === doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }
//     res.json(doctor);
//   });
// });

// export default router;