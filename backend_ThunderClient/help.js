/*

// Evaluation 2

// Chetan
// User Register:
POST http://localhost:5000/api/users/register
Body (JSON):
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123"
}

Response:
{
"id": 1,
"name": "John Doe",
"email": "john@example.com",
"token": "your_jwt token"
}

// User Login:
POST http://localhost:5000/api/users/login
Body (JSON):
{
"email": "john@example.com",
"password": "password123"
}

Response:
{
"id": 1,
"name": "John Doe",
"email": "john@example.com",
"token": "your_jwt_token"
}

---------------------------------------------

// Gunjan
// Book an Appointment:
POST http://localhost:5000/api/appointments
Body (JSON):
{
"patientId":"123",
"doctorId":"456",
"date": "2025-03-07",
"time": "10:00 AM"
}

// Get Patient's Appointments
GET http://localhost:5000/api/appointments/123

// Cancel an Appointment
DELETE http://localhost:5000/api/appointments/1

---------------------------------------------

// Anjali
// Get patient profile by ID
GET http://localhost:5000/api/patients/profile/pat1

Expected Response:
{
"_id":"pat1",
"name":"John Doe",
"email":"john@example.com",
"age": 30,
"gender":"Male",
"phone":"+1234567890"
}

// Update patient profile by ID
PUT http://localhost:5000/api/patients/profile/pat1
Body (JSON):
{
"name": "John Updated",
"age": 35,
"phone": "+1112223333"
}

---------------------------------------------

// Drishti
// Returns all doctors
GET http://localhost:5000/api/doctors

// Returns details of Doctor with ID 1
GET http://localhost:5000/api/doctors/doc1

Expected Output:
{
"_id": "doc1",
"name": "Dr. Richard James",
"speciality": "General physician",
"degree": "MBBS",
"experience": "4 Years",
"about": "Dr. Richard James has a strong commitment to delivering comprehensive medical car"
"fees": 50,
"address": {
"linel": "17th Cross, Richmond",
"line2": "Circle, Ring Road, London"
}

// Add a new Doctor
POST http://localhost:5000/api/doctors
Set Body raw JSON and enter:
{
"name": "Dr. John Doe",
"speciality": "Dentist",
"degree": "BDS",
"experience": "5 Years",
"about": "Expert in dental care and surgeries.",
"fees": 70,
"address": {
"line1": "10th Street",
"line2": "New York, USA"
}
}

Expected response :
{
"_id": "doc3",
"name": "Dr. John Doe",
"speciality": "Dentist",
"degree":"BDS",
"experience": "5 Years",
"about": "Expert in dental care and surgeries.",
"fees":70,
"address": {
"line1": "10th Street",
"line2": "New York, USA"
}

---------------------------------------------

// Agrim
// Update the Doctor's Detail
PUT http://localhost:5000/api/doctors/doc1
->Body → raw → JSON:
{
"name": "Dr. Richard James",
"speciality": "Cardiologist",
"experience": "6 Years"
}

// Delete any Doctor
DELETE http://localhost:5000/api/doctors/doc2
Expected Response:
{
"message": "Doctor deleted successfully"
}

*/