import React, { useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './student.css';
import axios from 'axios'; // Correct spelling of 'axios'
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate hook


function StudentManagement ()  {
  //! Save Students
  const [stName, SetStName] = useState("");
  const [stPConNumber, SetPConNumber] = useState("");
  const [stConNumber, SetStConNumber] = useState("");
  const [stDOB, SetStDOB] = useState("");
  const [stAddress, SetStAddress] = useState("");
  const [stNic, SetStNic] = useState("");
  const [stEmail, SetStEmail] = useState("");
  const [stAge, SetStAge] = useState("");

  const [students,setStudents] =useState([])

  const navigate = useNavigate(); // Initialize useNavigate

  

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/smsBK/StudentSave", {
        stname: stName, // Aligning frontend state with backend schema
        pConNumber: stPConNumber,
        stConNumber: stConNumber,
        stDOB: new Date(stDOB), // Ensure valid date format
        stAddress: stAddress,
        stNic: stNic,
        stEmail: stEmail,
        stAge: stAge,
      });
      console.log("Data saved successfully:", response.data);
      setStudents([...students, response.data]); // Add the new student to the list
      window.location.reload()
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  
  // ! get all students
 
  // useEffect(() => {
  //  axios.get('http://127.0.0.1:8000/smsBK/getAllStudents')
  //  .then(result => setStudents(result.data))
  //  .catch(err => console.log(err))
  // }, []);

  React.useEffect(() => {
    axios.get("http://localhost:8000/smsBK/getAllStudents")
      .then((response) => {
        console.log(response.data); // Debug the data structure here
        setStudents(response.data.content); // Adjust to match the structure
       
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setStudents([]); // Set to an empty array to avoid crashes
      });
  }, []);

  //! Delete Function
const handleDelete = (id)=>{
  axios.delete('http://localhost:8000/smsBK/studentDelete/'+id)
  .then(res => {console.log(res)
    window.location.reload()
  })
  .catch(err => console.log(err))
}



 
  

  return (
    <div className='Main'>
      <h1 className='text-center fw-bold m-1'>Student Management</h1>
      <div className='row mt-2'>
        {/* 1st column search section */}
        <div className="column-01 col-2 p-5 m-4">
          <div className="search-section">
            <h6 className='fs-2'>Student List</h6>
            <div className="overflow-scroll" style={{ maxHeight: '500px', marginTop: '20px'}}>
            {students.map((student,index) => {
              return <ul key={index} style={{padding:0}}
              >
               <div className='justify-content-center fs-6 ' style={{border:"solid 1px white",padding:"8px",borderRadius:"10px"}}>
               <li  style={{cursor:"pointer",color:"black"}}
               >{student.stname}</li> 
               <div className = 'd-flex justify-content mt-1'>
               <li> <Link to={`/stUpdate/${student._id}`} className="btn btn-success p-1">Update</Link></li>
               <li><button className='btn btn-danger p-1' onClick={()=> handleDelete(student._id)}>Delete</button> </li>
               </div>
               </div>
              </ul>
            })}
            </div>
          </div>
        </div>

        {/* Second column Body */}
        <div className=" col-8 p-5 m-1">
          <Form className='container column-02' onSubmit={Submit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formStudentName">
                  <Form.Control
                    type="text"
                    placeholder="Enter student name"
                    onChange={(e) => SetStName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formParentContact">
                  <Form.Control
                    type="text"
                    placeholder="Enter Parent Contact Number"
                    onChange={(e) => SetPConNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentContact">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Contact Number"
                    onChange={(e) => SetStConNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentNIC">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student NIC"
                    onChange={(e) => SetStNic(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formStudentBirthday">
                  <Form.Control
                    type="date"
                    placeholder="Enter Student Birthday"
                    onChange={(e) => SetStDOB(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentAddress">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Address"
                    onChange={(e) => SetStAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter Student Email"
                    onChange={(e) => SetStEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentAge">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Age"
                    onChange={(e) => SetStAge(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center mt-3">
              <div className="m-2">
                <Button className='btn btn-success' type="submit" >Submit</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
