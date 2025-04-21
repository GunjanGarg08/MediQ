import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import apointmentModel from "../models/apointmentModel.js"

// API for adding doctor
const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        // Checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // Validating Email Format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // Validating Strong Password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Hashing Doctor Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password")
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments list

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await apointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      const appointmentData = await apointmentModel.findById(appointmentId);
      
      await apointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true}) //jab slot cancel hoga to uska time bhi free hoga jise jme dobaara render kraana pdega qki booked hone pr ui se vo hide hota tha
      
      //Releasing doctor slot 
      const {docId,slotDate,slotTime} = appointmentData
  
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked
      slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !== slotTime)
  
      await doctorModel.findByIdAndUpdate(docId , {slots_booked})
      res.json({success:true, message:'appointment cancel'})
    } catch (error) {
      res.json({ success: false, message: error.message });
      console.log(error);
    }
  };

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel }