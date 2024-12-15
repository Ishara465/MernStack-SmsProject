const express = require("express");
const eventMg = require("../models/eventMg.model");

const router = express.Router();

// ? event mg data save
router.post("/smsBK/eventMgSave", async (req, res) => {
  try {
    let eventSave = new eventMg(req.body);
    await eventSave.save();
    return res.status(200).json({
      message: "event is saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// ? eventMg update
router.put("/smsBK/eventMgUpdate/:id", async (req, res) => {
  try {
    const eventUpdate = await eventMg.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!eventUpdate) {
      return res.status(404).json({
        message: "event not found",
      });
    }
    return res.status(200).json({
      message: "event data updated successfully",
      eventUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//  ? Get All events
router.get("/smsBK/getAllEvents", async (req, res) => {
  try {
    const getAllEvents = await eventMg.find().exec();
    return res.status(200).json({
      code: res.statusCode,
      message: "event data get success",
      content: getAllEvents,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// ? Delete event by ID
router.delete("/smsBK/eventDelete/:id", async (req, res) => {
  try {
    const eventDelete = await eventMg.findByIdAndDelete(req.params.id);
    if (!eventDelete) {
      return res.status(404).json({
        message: "event not found",
      });
    }
    return res.json({
      message: "event delete successfully",
      eventDelete,
    });
  } catch (err) {
    return res.status(400).json({
      message: "event deleted unsuccessfully",
      error: err,
    });
  }
});


//  get Event by ID
router.get('/smsBK/getEvent/:id', (req, res) => {
  const id = req.params.id;
  eventMg.findById(id) // Pass the ID directly, not as an object
    .then(eventMg => {
      if (!eventMg) {
        return res.status(404).json({ error: 'event not found' }); // Handle case where tutor is not found
      }
      res.json(eventMg);
    })
    .catch(err => {
      console.error("Error fetching tutor:", err); // Log the error for debugging
      res.status(500).json({ error: 'Server error' }); // Handle server errors
    });
});

module.exports = router;
