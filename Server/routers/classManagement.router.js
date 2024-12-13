const express = require("express");
const classMg = require("../models/ClassManagement.model");

const router = express.Router();

// *? class management data save
router.post("/smsBK/classMgSave", async (req, res) => {
  try {
    let classMgSave = new classMg(req.body);
    await classMgSave.save();
    return res.status(200).json({
      message: "classes is saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// *? update classes
// router.put("/smsBK/classMgUpdate/:id", async (req, res) => {
//   try {
//     const updatedClass = await classMg.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedClass) {
//       return res.status(404).json({
//         message: "class not found",
//       });
//     }
//     return res.status(200).json({
//       message: "class data updated successfully",
//       updatedClass,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }
// });

router.put("/smsBK/classMgUpdate/", async (req, res) => {
  try {
    // Extract the class ID from the route parameters
    const classId = req.params.id;

    // Perform the update using findByIdAndUpdate
    const updatedClass = await classMg.findByIdAndUpdate(
      classId, // ID to find the document
      { $set: req.body }, // Data to update
      { new: true } // Return the updated document
    );

    // If no document was found, return a 404 response
    if (!updatedClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    // Return the updated document along with a success message
    return res.status(200).json({
      message: "Class data updated successfully",
      updatedClass,
    });
  } catch (err) {
    // Handle any errors and return a 400 response
    return res.status(400).json({
      error: err.message,
    });
  }
});





//  ? Get classes
router.get("/smsBK/getAllClassMgs", async (req, res) => {
  try {
    const getClasses = await classMg.find().exec();
    return res.status(200).json({
      code: res.statusCode,
      message: "classes data get success",
      content: getClasses,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// ? Delete class by ID
router.delete("/smsBK/classDelete/:id", async (req, res) => {
  try {
    const classDeleted = await classMg.findByIdAndDelete(req.params.id);
    if (!classDeleted) {
      return res.status(404).json({
        message: "class not found",
      });
    }
    return res.json({
      message: "class delete successfully",
      classDeleted,
    });
  } catch (err) {
    return res.status(400).json({
      message: "class deleted unsuccessfully",
      error: err,
    });
  }
});

module.exports = router;
