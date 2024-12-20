const express = require("express");
const tutor = require("../models/tutor.models");

const router = express.Router();

// *? user Data save
router.post("/smsBK/tutorSave", async (req, res) => {
  console.log("Received Data: ",req.body)
    try {

      let tutorSave = new tutor(req.body);
      await tutorSave.save();
      return res.status(200).json({
        success: "tutor is saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });

  // *? Update user by ID

router.put("/smsBK/tutorUpdate/:id", async (req, res) => {
    try {
      const updatedTutor = await tutor.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Return the updated document
      );
  
      if (!updatedTutor) {
        return res.status(404).json({
          message: "tutor not found",
        });
      }
  
      return res.status(200).json({
        success: "tutor data updated successfully",
        updatedTutor,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

// ? Get Tutor

router.get("/smsBK/getAllTutors", async (req, res) => {
  try {
    const getTutors = await tutor.find().exec();
    return res.status(200).json({
      success: true,
      tutorsAllData: getTutors,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});


  // *? Delete tutor by ID
 router.delete("/smsBK/tutorDelete/:id",async(req,res)=>{
    try{
        const tutorDeleted = await tutor.findByIdAndDelete(req.params.id);
        if(!tutorDeleted){
            return res.status(404).json({
                message:"tutor is not found"
            });
        }
        return res.json({
            message:"tutor delete successfully",
            tutorDeleted,
        });
    }catch(err){
        return res.status(400).json({
            message:"tutor delete unsuccessful",
            error:err
        });
    }
 });

 //  get Tutor by ID
 router.get('/smsBK/getTutor/:id', (req, res) => {
  const id = req.params.id;
  tutor.findById(id) // Pass the ID directly, not as an object
    .then(tutor => {
      if (!tutor) {
        return res.status(404).json({ error: 'Tutor not found' }); // Handle case where tutor is not found
      }
      res.json(tutor);
    })
    .catch(err => {
      console.error("Error fetching tutor:", err); // Log the error for debugging
      res.status(500).json({ error: 'Server error' }); // Handle server errors
    });
});


  module.exports =router;