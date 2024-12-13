import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stName, setStName] = useState("");
  const [stPConNumber, setPConNumber] = useState("");
  const [stConNumber, setStConNumber] = useState("");
  const [stDOB, setStDOB] = useState("");
  const [stAddress, setStAddress] = useState("");
  const [stNic, setStNic] = useState("");
  const [stEmail, setStEmail] = useState("");
  const [stAge, setStAge] = useState("");

  // Fetch existing student data
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/smsBK/getStudent/"+id)
      .then(result => {
        console.log(result);
        setStName(result.data.stname);
        setPConNumber(result.data.pConNumber);
        setStConNumber(result.data.stConNumber);
        setStDOB(result.data.stDOB);
        setStAddress(result.data.stAddress);
        setStNic(result.data.stNic);
        setStEmail(result.data.stEmail);
        setStAge(result.data.stAge);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, [id]); // Ensure the effect runs when `id` changes

  // Update student data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://127.0.0.1:8000/smsBK/studentUpdate/"+id, {
        stname: stName,
        pConNumber: stPConNumber,
        stConNumber: stConNumber,
        stDOB: new Date(stDOB), // Ensure valid date format
        stAddress: stAddress,
        stNic: stNic,
        stEmail: stEmail,
        stAge: stAge,
      });
      console.log("Data updated successfully:", response.data);
      navigate("/student")
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
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="col-10 col-md-8 col-lg-6 p-4 border rounded shadow column-01">
        <h1 className="text-center mb-4">Student Update</h1>
        <Form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formStudentName">
                <Form.Control
                  type="text"
                  placeholder="Enter student name"
                  value={stName}
                  onChange={(e) => setStName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formParentContact">
                <Form.Control
                  type="text"
                  placeholder="Enter Parent Contact Number"
                  value={stPConNumber}
                  onChange={(e) => setPConNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentContact">
                <Form.Control
                  type="text"
                  placeholder="Enter Student Contact Number"
                  value={stConNumber}
                  onChange={(e) => setStConNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentNIC">
                <Form.Control
                  type="text"
                  placeholder="Enter Student NIC"
                  value={stNic}
                  onChange={(e) => setStNic(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formStudentBirthday">
                <Form.Control
                  type="date "
                  placeholder="Enter Student Birthday"
                  value={stDOB}
                  onChange={(e) => setStDOB(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentAddress">
                <Form.Control
                  type="text"
                  placeholder="Enter Student Address"
                  value={stAddress}
                  onChange={(e) => setStAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter Student Email"
                  value={stEmail}
                  onChange={(e) => setStEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentAge">
                <Form.Control
                  type="number"
                  placeholder="Enter Student Age"
                  value={stAge}
                  onChange={(e) => setStAge(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Button className="btn btn-success" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default StUpdate;
