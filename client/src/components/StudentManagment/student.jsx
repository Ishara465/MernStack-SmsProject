import React, { useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './student.css';
import axios from 'axios'; // Correct spelling of 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook



function StudentManagement ()  {
  //!  Declare state variables
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

  
// ! Save Student Function
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/smsBK/StudentSave", {
        stName: stName, // Aligning frontend state with backend schema
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

// ! Student View by ID
const handleView = (id) => {
  axios
    .get("http://127.0.0.1:8000/smsBK/getStudent/" + id)
    .then((result) => {
      console.log(result);
      SetStName(result.data.stName);
      SetPConNumber(result.data.pConNumber);
      SetStConNumber(result.data.stConNumber);
      SetStDOB(result.data.stDOB);
      SetStAddress(result.data.stAddress);
      SetStNic(result.data.stNic);
      SetStEmail(result.data.stEmail);
      SetStAge(result.data.stAge);
    })
    .catch((err) => console.error("Error fetching data:", err));
};


//! Update student data
const handleUpdate = async (id,e) => {
  e.preventDefault();
  try {
    const response = await axios.put("http://127.0.0.1:8000/smsBK/studentUpdate/"+id, {
      stName: stName,
      pConNumber: stPConNumber,
      stConNumber: stConNumber,
      stDOB: new Date(stDOB), // Ensure valid date format
      stAddress: stAddress,
      stNic: stNic,
      stEmail: stEmail,
      stAge: stAge,
    });
    console.log("Data updated successfully:", response.data);
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

  return (
   <div className="d-flex flex-column min-vh-100">
     <div className='Main '>
      <h1 className='text-center fw-bold m-1'>Student Management</h1>
      <div className='row mt-2'>
        {/* 1st column search section */}
        <div className="column-01 col-2 p-5 m-4">
          <div className="search-section">
            <h6 className='fs-2'>Student List</h6>
            <div className="overflow-scroll" style={{ maxHeight: '305px', marginTop: '20px',minWidth:"250px"}}>
            {students.map((student,index) => {
              return <ul key={index} style={{padding:0}}
              >
               <div className='justify-content-center fs-6 ' style={{border:"solid 1px white",padding:"1px",borderRadius:"10px"}}>
               <li  style={{cursor:"pointer",color:"black"}}
               >{student.stName}</li> 
               <div className = 'd-flex justify-content mt-1'>
               <li> <button  className="btn btn-success p-1" onClick={(e)=>handleUpdate(student._id,e)}>Update</button></li>
               <li><button className='btn btn-danger p-1' onClick={()=> handleDelete(student._id)}>Delete</button> </li>
               <li><button className='btn btn-warning' onClick={()=>handleView(student._id)}>View</button></li>
               </div>
               </div>
              </ul>
            })}
            </div>
          </div>
        </div>

        {/* Second column Body */}
        <div className=" col-8 p-5 m-1">
          <Form className='container column-02'>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formStudentName">
                  <Form.Control
                    type="text"
                    placeholder="Enter student name"
                    onChange={(e) => SetStName(e.target.value)}
                    value={stName}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formParentContact">
                  <Form.Control
                    type="text"
                    placeholder="Enter Parent Contact Number"
                    onChange={(e) => SetPConNumber(e.target.value)}
                    value={stPConNumber}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentContact">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Contact Number"
                    onChange={(e) => SetStConNumber(e.target.value)}
                    value={stConNumber}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentNIC">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student NIC"
                    onChange={(e) => SetStNic(e.target.value)}
                    value={stNic}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formStudentBirthday">
                  <Form.Control
                    type="date"
                    placeholder="Enter Student Birthday"
                    onChange={(e) => SetStDOB(e.target.value)}
                    value={stDOB}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentAddress">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Address"
                    onChange={(e) => SetStAddress(e.target.value)}
                    value={stAddress}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter Student Email"
                    onChange={(e) => SetStEmail(e.target.value)}
                    value={stEmail}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentAge">
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Age"
                    onChange={(e) => SetStAge(e.target.value)}
                    value={stAge}
                  />
                </Form.Group>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center mt-3">
              <div className="m-2">
                <Button className='btn btn-success' type="submit" onClick={Submit}>Submit</Button>
                <Button className='btn btn-secondary m-1 p-2' type="clear" >Clear</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    
   </div>
  );
};

export default StudentManagement;
