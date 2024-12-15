import React,{useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

function EventManagement(){
// !Declare state variables
    const [title,seTitle] = useState("");
    const [startDateTime,setStartDateTime] = useState("");
    const [ endDateTime,setEndDateTime] = useState("");
    const [description,setDescription] = useState("");
   
    // ! Save Student
    const Submit = async(e) =>{
      e.preventDefault();
      try{
        const response = await axios.post("http://127.0.0.1:8000/smsBK/eventMgSave",{
          title, 
          startDateTime:new Date(startDateTime),
          endDateTime: new Date(endDateTime),
          description
          
      
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
    const [events,setEvents] = useState([])

    React.useEffect(() => {
    axios.get("http://127.0.0.1:8000/smsBK/getAllEvents")
    .then((response) => {
      console.log(response.data);
      // Check if response.data.content is an array
      if (Array.isArray(response.data.content)) {
        setEvents(response.data.content);
      } else {
        console.error("Unexpected data structure:", response.data);
        setEvents([]); // Set an empty array if the structure is not as expected
      }
    })
    .catch((error) => {
      console.error("Error fetching tutor: ", error);
      setEvents([]); // Set an empty array on error
    });
}, []);

// ! Delete Function
const handleDelete =(id)=>{
  axios.delete("http://127.0.0.1:8000/smsBK/eventDelete/"+id)
  .then(res => {console.log(res)
    window.location.reload()
  })
  .catch(err => console.log(err))
}

// ! View Events by ID
const handleView = (id) => {
  axios
    .get(`http://127.0.0.1:8000/smsBK/getEvent/${id}`)
    .then((result) => {
      console.log(result);
      console.log("working")
      seTitle(result.data.title);
      setStartDateTime(result.data.startDateTime);
      setEndDateTime(result.data.endDateTime);
      setDescription(result.data.description);
    })
    .catch((err) => console.error("Error Fetching data:", err));
};







  return (
    <div className='Main'>
    <h1 className='text-center fw-bold m-1'>Event and Announcement Management</h1>
    <div className="row">
      <div className="column-01 col-2 m-4">
        <div>
          <h6 className='fs-2'>Tutor List</h6>
          
          {/*Tutor details updated div */}
          <div className='overflow-scroll' style={{maxHeight:'500px',marginTop:"20px",maxWidth:"600px"}}>
          {events.length > 0 ? (
              events.map((events, index) => (
              
              <ul key={index}>
                <li>{events.title}</li>

                <div className='d-flex justify-content mt-1'>
                <li> <Button variant="outline-success p-1 m-1" onClick={(e) =>handleUpdate(events._id,e)}>Update</Button></li>
                <li> <Button variant="outline-danger  p-1 m-1" onClick={() => handleDelete(events._id)}>Delete</Button></li>
                <li><Button variant="outline-warning  p-1 m-1" 
                key={events._id}
                onClick={()=>handleView(events._id)}>View</Button></li>
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
                  placeholder="Enter Title"
                  onChange={(e) => seTitle(e.target.value)}
                  value={title}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <label htmlFor="">Start Date and Time</label>
                <Form.Control
                  type="Date"
                  placeholder=""
                  onChange={(e) => setStartDateTime(e.target.value)}
                  value={startDateTime}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
              <label htmlFor="">End Date and Time</label>
                <Form.Control
                  type="date"
                  placeholder=""
                  onChange={(e) => setEndDateTime(e.target.value)}
                  value={endDateTime}
                />
              </Form.Group>
              
            </div>

            <div className="col-md-6">
              

              <Form.Group className="mb-3" >
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  style={{ height: '180px', width: '400px' }}
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
  )
}

export default EventManagement
