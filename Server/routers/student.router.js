const express = require("express");
const studentMG = require("../models/student.model");

const router = express.Router();


// *? student Data save
router.post("/smsBK/StudentSave", async (req, res) => {
  console.log("Received Data: ",req.body)
    try {
      let studentSave = new studentMG(req.body,);
      await studentSave.save();
      return res.status(200).json({
        message: "student is saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });


 


  // *? Update student by stId  ##########################i

// router.put("/smsBK/studentUpdate/:stId", async (req, res) => {
//     try {
//       const updatedStudent = await studentMG.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true } // Return the updated document
//       );
  
//       if (!updatedStudent) {
//         return res.status(404).json({
//           message: "student not found",
//         });
//       }
  
//       return res.status(200).json({
//         message: "student data updated successfully",
//         updatedUser,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         error: err.message,
//       });
//     }
//   });

router.put("/smsBK/studentUpdate/:id", async (req, res) => {
  try {
    const updatedStudent = await studentMG.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Student data updated successfully",
      updatedStudent,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});


// ? Get Student

router.get("/smsBK/getAllStudents", async (req, res) => {
  try {
    const getStudents = await studentMG.find().exec();
    return res.status(200).json({
      code : res.statusCode,
      message: "student data get success",
      content: getStudents,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});



  // *? Delete user by ID
 router.delete("/smsBK/studentDelete/:id",async(req,res)=>{
    try{
        const studentDeleted = await studentMG.findByIdAndDelete(req.params.id);
        if(!studentDeleted){
            return res.status(404).json({
                message:"student is not found"
            });
        }
        return res.json({
            message:"student delete successfully",
            studentDeleted,
        });
    }catch(err){
        return res.status(400).json({
            message:"student delete unsuccessful",
            error:err
        });
    }
 });


//  get students ID
router.get('/smsBK/getStudent/:id',(req,res) =>{
  const id = req.params.id;
  studentMG.findById({_id:id})
  .then(students => res.json(students))
  .catch(err => res.json(err))
})

// Search students by name
router.get("/smsBK/searchStudent", async (req, res) => {
  const searchTerm = req.query.name; // Get the name query parameter

  try {
    // Find students whose name matches the search term (case-insensitive)
    const students = await studentMG.find({
      stname: { $regex: searchTerm, $options: "i" }, // 'i' for case-insensitive search
    });

    res.json(students); // Return the matching students
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

  module.exports =router;