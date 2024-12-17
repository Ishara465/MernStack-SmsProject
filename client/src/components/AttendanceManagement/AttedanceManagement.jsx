import React,{useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

function AttedanceManagement(){
     // !Declare state variables
        const [studentId,setStudentId] = useState("");
        const [studentName,setStudentName] = useState("");
        const [attendanceDate,setAttendanceDate] = useState("");
        const [attendanceTime,setAttendanceTime] = useState("");
        const [classId,setClassId] = useState("");
        const [className,setClassName] = useState("");
        const [description,setDescription] = useState("");


         // ! View attendance by ID
const handleView = (id) => {
    axios
      .get(`http://127.0.0.1:8000/smsBK/getAttendance/${id}`)
      .then((result) => {
        console.log(result);
        console.log("working")
        setStudentId(result.data.studentId);
        setStudentName(result.data.studentName);
        setAttendanceDate(result.data.attendanceDate);
        setAttendanceTime(result.data.attendanceTime);
        setClassId(result.data.classId);
        setClassName(result.data.className);
        setDescription(result.data.description);
       
      })
      .catch((err) => console.error("Error Fetching data:", err));
  };


    // ! Save Attendance
    const Submit = async(e) =>{
        e.preventDefault();
        try{
          const response = await axios.post("http://127.0.0.1:8000/smsBK/attendanceSave",{
            studentId, 
            studentName,
            attendanceDate: new Date(attendanceDate),
            attendanceTime, 
            classId,
            className,
            description,
        
          });
          console.log("Data saved successfully: ", response.data);
          window.location.reload()
        }catch(error){
          if (error.response) {
            console.error("Error response from server:", error.response.data);
          } else if (error.request) {
            console.error("No response from server:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
        }
      }

// !Get All Attendance
const [attendance,setAttendance] = useState([])

React.useEffect(() => {
axios.get("http://127.0.0.1:8000/smsBK/getAllAttendance")
.then((response) => {
  console.log(response.data);
  // Check if response.data.content is an array
  if (Array.isArray(response.data.content)) {
    setAttendance(response.data.content);
  } else {
    console.error("Unexpected data structure:", response.data);
    setAttendance([]); // Set an empty array if the structure is not as expected
  }
})
.catch((error) => {
  console.error("Error fetching tutor: ", error);
  setAttendance([]); // Set an empty array on error
});
}, []);

// ! Delete Function
const handleDelete =(id)=>{
    axios.delete("http://127.0.0.1:8000/smsBK/attendanceDelete/"+id)
    .then(res => {console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  //! Attendance update by ID
const handleUpdate = async (id,e) =>{
    e.preventDefault();
    try{
      const response = await axios.put(`http://127.0.0.1:8000/smsBK/attendanceUpdate/${id}`,{
            studentId, 
            studentName,
            attendanceDate: new Date(attendanceDate),
            attendanceTime, 
            classId,
            className,
            description,
      })
      console.log("Data updated successfully:", response.data);
      window.location.reload()
    }catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  }

 

  return (
    <div>
     <div className='Main'>
      <h1 className='text-center fw-bold m-1'>Students Attendance Management</h1>
      <div className="row">
        <div className="column-01 col-2 m-4">
          <div>
            <h6 className='fs-2'>Students List</h6>
            
            {/* details updated div */}
            <div className='overflow-scroll' style={{maxHeight:'500px',marginTop:"20px",maxWidth:"600px"}}>
            {attendance.length > 0 ? (
                attendance.map((attendance, index) => (
                
                <ul key={index}>
                  <li>{attendance.studentName}</li>

                  <div className='d-flex justify-content mt-1'>
                  <li> <Button variant="btn btn-success p-1 m-1" onClick={(e) =>handleUpdate(attendance._id,e)}>Update</Button></li>
                  <li> <Button variant="btn btn-danger  p-1 m-1" onClick={() => handleDelete(attendance._id)}>Delete</Button></li>
                  <li><Button variant="btn btn-warning  p-1 m-1" 
                  key={attendance._id}
                  onClick={()=>handleView(attendance._id)}>View</Button></li>
                  </div>
                </ul>
                ))
              ) : (
                <p>No tutors available</p>
              )}

            </div>
          </div>
        </div>

        {/* Second column body */}
        <div className="col-8 p-5 m-1">
        <Form className='container column-02' >
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter Student ID"
                    onChange={(e) => setStudentId(e.target.value)}
                    value={studentId}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Name"
                    onChange={(e) => setStudentName(e.target.value)}
                    value={studentName}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <label htmlFor="" >Enter Attendance Date</label>
                  <Form.Control
                    type="date"
                    placeholder=""
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    value={attendanceDate}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <label htmlFor=""   >Attendance get Time</label>
                  <Form.Control
                    type="time"
                    placeholder=""
                    onChange={(e) => setAttendanceTime(e.target.value)}
                    value={attendanceTime}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter Class ID"
                    onChange={(e) => setClassId(e.target.value)}
                    value={classId}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentAddress">
                  <Form.Control
                    type="email"
                    placeholder="Enter Class Name"
                    onChange={(e) => setClassName(e.target.value)}
                    value={className}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>

              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center mt-3">
              <div className="m-2">
                <Button className='btn btn-success m-1' type="submit" onClick={Submit}>Submit</Button>
                <Button className='btn btn-secondary m-1 p-2' type="clear" >Clear</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AttedanceManagement
