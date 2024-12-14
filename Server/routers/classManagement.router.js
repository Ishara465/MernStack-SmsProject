const express = require("express");
const classMg = require("../models/ClassManagement.model");

const router = express.Router();

// *? class management data save
router.post("/smsBK/classMgSave", async (req, res) => {
  console.log("Received data ",req.body);
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
router.put("/smsBK/classMgUpdate/:id", async (req, res) => {
  try {
    const updatedClass = await classMg.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({
        message: "class not found",
      });
    }
    return res.status(200).json({
      message: "class data updated successfully",
      updatedClass,
    });
  } catch (err) {
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

//  get class by ID
router.get('/smsBK/getClass/:id', (req, res) => {
  const id = req.params.id;
    classMg.findById(id) // Pass the ID directly, not as an object
    .then(classMg => {
      if (!classMg) {
        return res.status(404).json({ error: 'classes not found' }); // Handle case where tutor is not found
      }
      res.json(classMg);
    })
    .catch(err => {
      console.error("Error fetching tutor:", err); // Log the error for debugging
      res.status(500).json({ error: 'Server error' }); // Handle server errors
    });
});

module.exports = router;
