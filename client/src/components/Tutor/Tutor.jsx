import React, { useEffect, useState } from 'react'
import './Tutor.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

function Tutor  ()  {

    // !Save Tutor
    const [tName,setTName] = useState("");
    const [tPhoneNumber,setTPhoneNumber] = useState("");
    const [tDob,setTDob] = useState("");
    const [tAddress,setTAddress] = useState("");
    const [tNic,setTNic] = useState("");
    const [email,setEmail] = useState("");
    const [tSubject,setTSubject] = useState("");
    
    const Submit = async(e) =>{
      e.preventDefault();
      try{
        const response = await axios.post("http://127.0.0.1:8000/smsBK/tutorSave",{
          tName: tName, 
          tPhoneNumber: tPhoneNumber,
          tDob: new Date(tDob),
          tAddress: tAddress, 
          tNic: tNic,
          email: email,
          tSubject: tSubject,
      
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

    // !Get All Tutor
    const [tutors,setTutors] = useState([])

    React.useEffect(() => {
    axios.get("http://127.0.0.1:8000/smsBK/getAllTutors")
    .then((response) => {
      console.log(response.data);
      // Check if response.data.content is an array
      if (Array.isArray(response.data.tutorsAllData)) {
        setTutors(response.data.tutorsAllData);
      } else {
        console.error("Unexpected data structure:", response.data);
        setTutors([]); // Set an empty array if the structure is not as expected
      }
    })
    .catch((error) => {
      console.error("Error fetching tutor: ", error);
      setTutors([]); // Set an empty array on error
    });
}, []);

  // ! Delete Function
  const handleDelete =(id)=>{
    axios.delete("http://127.0.0.1:8000/smsBK/tutorDelete/"+id)
    .then(res => {console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }




  return (
    <div className='Main'>
      <h1 className='text-center fw-bold m-1'>Tutor Management</h1>
      <div className="row">
        <div className="column-01 col-2 m-4">
          <div>
            <h6 className='fs-2'>Tutor List</h6>
            
            {/*Tutor details updated div */}
            <div className='overflow-scroll' style={{maxHeight:'500px',marginTop:"20px",maxWidth:"600px"}}>
            {tutors.length > 0 ? (
                tutors.map((tutor, index) => (
                <ul key={index}>
                  <li>{tutor.tName}</li>

                  <div className='d-flex justify-content mt-1'>
                  <li> <Button variant="outline-success p-1 m-1">Update</Button></li>
                  <li> <Button variant="outline-danger  p-1 m-1" onClick={() => handleDelete(tutor._id)}>Delete</Button></li>
                  <li><Button variant="outline-warning  p-1 m-1">View</Button></li>
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
        <Form className='container column-02' onSubmit={Submit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formStudentName">
                  <Form.Control
                    type="text"
                    placeholder="Enter tutor name"
                    onChange={(e) => setTName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formParentContact">
                  <Form.Control
                    type="text"
                    placeholder="Enter tutor Contact Number"
                    onChange={(e) => setTPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentContact">
                  <Form.Control
                    type="date"
                    placeholder="Enter date of birth"
                    onChange={(e) => setTDob(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentNIC">
                  <Form.Control
                    type="text"
                    placeholder="Enter tutor address"
                    onChange={(e) => setTAddress(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formStudentBirthday">
                  <Form.Control
                    type="text"
                    placeholder="Enter tutor Nic"
                    onChange={(e) => setTNic(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentAddress">
                  <Form.Control
                    type="email"
                    placeholder="Enter tutor Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter tutor subject (only Subject Number)"
                    onChange={(e) => setTSubject(e.target.value)}
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
  )
}

export default Tutor
