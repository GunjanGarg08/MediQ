import React from 'react'

const RelatedDoctors = ({speciality,docId}) => {

    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc,setRelDocs] = useState([])

    useEffect(()=>{
         if(doctors.length>0 && speciality){
             const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
             setRelDocs(doctorsData)
         }
    },[doctors,speciality,docId])
    return (
        <div>

        </div>
    )
}
export default RelatedDoctors