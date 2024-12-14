import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import './ClassManagement.css'

function ClassManagement() {
//!  Declare state variables
const [className,setClassName] = useState("");
const [classType,setClassType] = useState("");
const[subject,setSubject] = useState("");
const [tutor,setTutor] = useState("");
const [grade,SetGrade] = useState("");
const [batch,setBatch] = useState("");
const [classFee,setClassFee] = useState("");
const [day,setDay]= useState("");
const [startTime,setStartTime]=useState("");
const [endTime,setEndTime] = useState("");
const [classRoom,setClassRoom] = useState("")
const [classes,setClasses] = useState([])


// ! Save Classes
const SaveClass =async (e) =>{
    e.preventDefault();
    try{
        const response = await axios.post("http://127.0.0.1:8000/smsBK/classMgSave",{
            className:className,
            classType:classType,
            subject:subject,
            tutor:tutor,
            grade:grade,
            batch:batch,
            classFee: parseFloat(classFee),
            day: new Date(day),
            startTime:startTime,
            endTime:endTime,
            classRoom:classRoom
        });
        console.log("Data saved successfully: ",response.data);
        window.location.reload();
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

// ! Get All Classes
React.useEffect(()=>{
    axios.get("http://127.0.0.1:8000/smsBK/getAllClassMgs")
    .then((response) =>{
        if(Array.isArray(response.data.content)){
            setClasses(response.data.content);
        }else{
            console.error("Unexpected data Structure: ", response.data);
            setClasses([])
        }
    })
    .catch((error)=>{
        console.error("Error fetching classes: ",error);
        setClasses([]);
    })
},[])

// ! Delete class by ID
const handleDelete = (id) =>{
    axios.delete("http://127.0.0.1:8000/smsBK/classDelete/"+id)
    .then(res =>{console.log(res)
        window.location.reload();
    })
    .catch(err => console.log(err))
}

// ! view Class by ID
const handleView = (id) => {
    axios
      .get(`http://127.0.0.1:8000/smsBK/getClass/${id}`)
      .then((result) => {
        console.log(result);
        console.log("working")
        setClassName(result.data.className);
        setClassType(result.data.classType);
        setSubject(result.data.subject);
        setTutor(result.data.tutor);
        SetGrade(result.data.grade);
        setBatch(result.data.batch);
        setClassFee(result.data.classFee);
        setDay(result.data.day);
        setStartTime(result.data.startTime); 
        setEndTime(result.data.endTime);
        setClassRoom(result.data.classRoom);

       
      })
      .catch((err) => console.error("Error Fetching data:", err));
  };

  //! class update by ID
const handleUpdate = async (id,e) =>{
    e.preventDefault();
    try{
      const response = await axios.put(`http://127.0.0.1:8000/smsBK/classMgUpdate/${id}`,{
        className:className,
        classType:classType,
        subject:subject,
        tutor:tutor,
        grade:grade,
        batch:batch,
        classFee: parseFloat(classFee),
        day: new Date(day),
        startTime:startTime,
        endTime:endTime,
        classRoom:classRoom
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
    <div className="Main">
      <h1 className="text-center fw-bold m-1">Class Management</h1>
      <div className="row">
        <div className="column-01 col-2 m-4">
          <div>
            <h6 className="fs-2">Class List</h6>

            {/* Class details View */}
            <div
              className="overflow-scroll"
              style={{
                maxHeight: "500px",
                marginTop: "20px",
                maxWidth: "600px",
              }}
            >
              {
              
                classes.map((classes,index)=>(

                    <ul key={index}>
                        <li>{classes.className}</li>
                        <div className="d-flex justify-content mt-1">
                        <li> <button  className="btn btn-success p-1 m-1" onClick={(e)=>handleUpdate(classes._id,e)}>Update</button></li>
                        <li><button className='btn btn-danger p-1 m-1' onClick={()=> handleDelete(classes._id)}>Delete</button> </li>
                        <li><button className='btn btn-warning p-1 m-1' onClick={()=>handleView(classes._id)}>View</button></li>
                        </div>
                    </ul>
                ))
               
              }
            </div>
          </div>
        </div>
        {/* Second Column Body*/}
        <div className="col-8 p-5 m-1">
          <Form className="container column-02">
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter class name"
                    onChange={(e) => setClassName(e.target.value)}
                    value={className}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter class type"
                    onChange={(e) => setClassType(e.target.value)}
                    value={classType}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter tutor"
                    onChange={(e) => setTutor(e.target.value)}
                    value={tutor}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control
                    type="date"
                    placeholder=""
                    onChange={(e) => setDay(e.target.value)}
                    value={day}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter grade"
                    onChange={(e) => SetGrade(e.target.value)}
                    value={grade}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter batch"
                    onChange={(e) => setBatch(e.target.value)}
                    value={batch}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control
                    type="text"
                    placeholder="Enter class fee"
                    onChange={(e) => setClassFee(e.target.value)}
                    value={classFee}
                  />
                </Form.Group>

                <Form.Group className="mb-2" >
                  <Form.Control
                    type="text"
                    placeholder="Enter class room"
                    onChange={(e) => setClassRoom(e.target.value)}
                    value={classRoom}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <Form.Group
                    className="mb-3"
                    style={{ flex: 1, marginRight: "10px" }}
                  >
                    <label htmlFor="startTime" className="p-2">
                      Start Time
                    </label>
                    <Form.Control
                      type="time"
                      id="startTime"
                      placeholder="Enter start time"
                      onChange={(e) => setStartTime(e.target.value)}
                      value={startTime}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    style={{ flex: 1, marginLeft: "10px" }}
                  >
                    <label htmlFor="endTime" className="p-2">
                      End Time
                    </label>
                    <Form.Control
                      type="time"
                      id="endTime"
                      placeholder="Enter end time"
                      onChange={(e) => setEndTime(e.target.value)}
                      value={endTime}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center mt-3">
              <div className="m-2">
                <Button className="btn btn-success m-1" type="submit" onClick={SaveClass}>
                  Submit
                </Button>
                <Button className="btn btn-secondary m-1 p-2" type="clear">
                  Clear
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ClassManagement;
