import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext'; // Adjust the import based on your file structure

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <div className='flex flex-col gap-4 text-sm text-gray-600'>
                    {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
                        <p
                            key={spec}
                            onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}
                        >
                            {spec}
                        </p>
                    ))}
                </div>
                <div>
                    {filterDoc.length > 0 ? (
                        filterDoc.map((doc) => (
                            <div key={doc.id} className="border p-4 rounded-lg mb-4">
                                <h3 className="text-lg font-semibold">{doc.name}</h3>
                                <p className="text-gray-600">{doc.speciality}</p>
                                <p className="text-gray-500">{doc.experience} years of experience</p>
                                <p className="text-gray-500">Fees: {doc.fees}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No doctors found for this specialty.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors