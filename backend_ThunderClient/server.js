import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'

// //App Config
// const app = express()
// const port = process.env.PORT || 4000

// //Middlewares
// app.use(express.json())
// app.use(cors())

// //API Endpoints
// app.get ('/',(req,res)=>{
//     res.send("API WORKING")
// })

// app.listen(port, ()=> console.log("Server Started", port))