const express = require("express");
const classFee = require("../models/classFee.models");

const router = express.Router();

// *? Get All Class Fees
router.get("/smsBK/getAllClassFee", async (req, res) => { 
    try {
        const getClassFees = await classFee.find().exec();
        return res.status(200).json({
        code: res.statusCode,
        message: "Class fee data retrieved successfully",
        content: getClassFees,
        });
    } catch (err) {
        return res.status(400).json({
        code:res.statusCode,
        error: err.message,
        });
    }
});

// *? Save Class Fee Data
router.post("/smsBK/classFeeSave", async (req, res) => {
  try {
    let classFeeSave = new classFee(req.body);
    await classFeeSave.save();
    return res.status(200).json({
      code:res.statusCode,
      message: "Class fee data saved successfully",
      content:classFeeSave,
    });
  } catch (err) {
    return res.status(400).json({
      code:res.statusCode,
      error: err.message,
    });
  }
});

 // *? Update user by ID

 router.put("/smsBK/classFeeUpdate/:id", async (req, res) => {
    try {
      const updatedClassFee = await classFee.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Return the updated document
      );
  
      if (!updatedClassFee) {
        return res.status(404).json({
          message: "tutor not found",
        });
      }
  
      return res.status(200).json({
        success: "classFee data updated successfully",
        updatedClassFee,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });



// *? Delete Class Fee by ID
router.delete("/smsBK/classFeeDelete/:id", async (req, res) => {
  try {
    const classFeeDeleted = await classFee.findOneAndDelete(req.params.id);
    if (!classFeeDeleted) {
      return res.status(404).json({
        code:res.statusCode,
        message: "Class fee not found",
      });
    }
    return res.status(200).json({
      code:res.statusCode,
      message: "Class fee deleted successfully",
      content:classFeeDeleted
    });
  } catch (err) {
    return res.status(400).json({
      code:res.statusCode,
      message: "Class fee deletion unsuccessful",
      error: err.message,
    });
  }
});


//  get classFee by ID
router.get('/smsBK/getClassFee/:id', (req, res) => {
    const id = req.params.id;
    classFee.findById(id) // Pass the ID directly, not as an object
      .then(classFee => {
        if (!classFee) {
          return res.status(404).json({ error: 'classFee not found' }); // Handle case where tutor is not found
        }
        res.json(classFee);
      })
      .catch(err => {
        console.error("Error fetching tutor:", err); // Log the error for debugging
        res.status(500).json({ error: 'Server error' }); // Handle server errors
      });
  });

module.exports = router;
