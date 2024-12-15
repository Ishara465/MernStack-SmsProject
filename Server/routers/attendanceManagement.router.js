const express = require("express");
const attendanceMg = require("../models/attendanceManagement.model");

const router = express.Router();

// *? attendance Data save
router.post("/smsBK/attendanceSave", async (req, res) => {
  console.log("Received Data: ",req.body)
    try {
      let attendanceSave = new attendanceMg(req.body);
      await attendanceSave.save();
      return res.status(200).json({
        success: "Attendance is saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });

  // *? Update Attendance by ID

router.put("/smsBK/attendanceUpdate/:id", async (req, res) => {
    try {
      const updatedAttendance = await attendanceMg.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Return the updated document
      );
  
      if (!updatedAttendance) {
        return res.status(404).json({
          message: "tutor not found",
        });
      }
  
      return res.status(200).json({
        success: "Attendance data updated successfully",
        content:updatedAttendance,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

// ? Get Attendance

router.get("/smsBK/getAllAttendance", async (req, res) => {
  try {
    const attendanceGet = await attendanceMg.find().exec();
    return res.status(200).json({
      success: true,
      content: attendanceGet,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});


  // *? Delete attendance by ID
 router.delete("/smsBK/attendanceDelete/:id",async(req,res)=>{
    try{
        const attendanceDelete = await attendanceMg.findByIdAndDelete(req.params.id);
        if(!attendanceDelete){
            return res.status(404).json({
                message:"attendance is not found"
            });
        }
        return res.json({
            message:"tutor delete successfully",
            content:attendanceDelete,
        });
    }catch(err){
        return res.status(400).json({
            message:"attendance delete unsuccessful",
            error:err
        });
    }
 });

 //  get Tutor by ID
 router.get('/smsBK/getAttendance/:id', (req, res) => {
  const id = req.params.id;
  attendanceMg.findById(id) // Pass the ID directly, not as an object
    .then(attendanceMg => {
      if (!attendanceMg) {
        return res.status(404).json({ error: 'attendance not found' }); // Handle case where tutor is not found
      }
      res.json(attendanceMg);
    })
    .catch(err => {
      console.error("Error fetching attendance:", err); // Log the error for debugging
      res.status(500).json({ error: 'Server error' }); // Handle server errors
    });
});


  module.exports =router;