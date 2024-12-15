import React,{useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

function ClassFee(){

    // !Declare state variables
        const [studentID,setStudentID] = useState("");
        const [className,setClassName] = useState("");
        const [paymentMonth,setPaymentMonth] = useState("");
        const [classFee,setClassFee] = useState("");
   
         // ! Save Class
        const Submit = async(e) =>{
        e.preventDefault();
        try{
          const response = await axios.post("http://127.0.0.1:8000/smsBK/classFeeSave",{
            studentID,  
            className,
            paymentMonth: new Date(paymentMonth),
            classFee   
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


      // !Get All Classes
    const [classes,setClasses] = useState([])

    React.useEffect(() => {
    axios.get("http://127.0.0.1:8000/smsBK/getAllClassFee")
    .then((response) => {
      console.log(response.data);
      // Check if response.data.content is an array
      if (Array.isArray(response.data.content)) {
        setClasses(response.data.content);
      } else {
        console.error("Unexpected data structure:", response.data);
        setClasses([]); // Set an empty array if the structure is not as expected
      }
    })
    .catch((error) => {
      console.error("Error fetching tutor: ", error);
      setClasses([]); // Set an empty array on error
    });
}, []);

// ! Delete Function
const handleDelete =(id)=>{
    axios.delete("http://127.0.0.1:8000/smsBK/classFeeDelete/"+id)
    .then(res => {console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  // ! View Tutor by ID
const handleView = (id) => {
    axios
      .get(`http://127.0.0.1:8000/smsBK/getClassFee/${id}`)
      .then((result) => {
        console.log(result);
        console.log("working")
        setStudentID(result.data.studentID);
        setClassName(result.data.className);
        setPaymentMonth(result.data.paymentMonth);
        setClassFee(result.data.classFee);  
      })
      .catch((err) => console.error("Error Fetching data:", err));
  };

  //! class fee update by ID
const handleUpdate = async (id,e) =>{
    e.preventDefault();
    try{
      const response = await axios.put(`http://127.0.0.1:8000/smsBK/classFeeUpdate/${id}`,{
        studentID,  
        className,
        paymentMonth: new Date(paymentMonth),
        classFee   
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
    <div className='Main'>
    <h1 className='text-center fw-bold m-1'>Class Fee</h1>
    <div className="row">
      <div className="column-01 col-2 m-4">
        <div>
          <h6 className='fs-2'>Class Name List</h6>
          
          {/*Tutor details updated div */}
          <div className='overflow-scroll' style={{maxHeight:'500px',marginTop:"20px",maxWidth:"600px"}}>
          {classes.length > 0 ? (
              classes.map((classes, index) => (
              
              <ul key={index}>
                <li>{classes.className}</li>

                <div className='d-flex justify-content mt-1'>
                <li> <Button variant="outline-success p-1 m-1" onClick={(e) =>handleUpdate(classes._id,e)}>Update</Button></li>
                <li> <Button variant="outline-danger  p-1 m-1" onClick={() => handleDelete(classes._id)}>Delete</Button></li>
                <li><Button variant="outline-warning  p-1 m-1" 
                key={classes._id}
                onClick={()=>handleView(classes._id)}>View</Button></li>
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
      <div className="col-8 p-5 m-1 ">
     <div className='container'>
     <Form className=' column-02 ' >
          <div className="row">
            <div className="col-10">
              <Form.Group className="mb-3" >
                <Form.Control
                  type="text"
                  placeholder="Enter Student ID"
                  onChange={(e) => setStudentID(e.target.value)}
                  value={studentID}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formParentContact">
                <Form.Control
                  type="text"
                  placeholder="Enter Class Name"
                  onChange={(e) => setClassName(e.target.value)}
                  value={className}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentContact">
                <label htmlFor="">Payment Month</label>
                <Form.Control
                  type="date"
                  placeholder=""
                  onChange={(e) => setPaymentMonth(e.target.value)}
                  value={paymentMonth}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentNIC">
                <Form.Control
                  type="text"
                  placeholder="Enter Class Fee"
                  onChange={(e) => setClassFee(e.target.value)}
                  value={classFee}
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

export default ClassFee
