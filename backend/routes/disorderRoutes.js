const express = require('express');
const router = express.Router();
const Disorder = require('../models/Disorder');

router.post('/add-disorder', async (req, res) => {
  const { email, name, dateDiagnosed } = req.body;

  try {
    const newDisorder = new Disorder({ email, name, dateDiagnosed });
    await newDisorder.save();
    res.json({ message: 'Disorder added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add disorder. Please try again.' });
  }
});


router.post('/add-intensity-log', async (req, res) => {
  const { disorderId, intensity } = req.body;

  try {
    const disorder = await Disorder.findById(disorderId);

    if (!disorder) {
      return res.status(404).json({ error: 'Disorder not found' });
    }

    const currentDate = new Date(); // Get the current date and time

    // Add a new intensity log with the current date and intensity
    disorder.intensityLogs.push({ date: currentDate, intensity });

    await disorder.save();

    res.status(200).json({ message: 'Intensity log added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving intensity log' });
  }
});


router.put('/update-intensity-log', async (req, res) => {
  const { disorderId, date, intensity } = req.body;

  try {
    const disorder = await Disorder.findById(disorderId);

    if (!disorder) {
      return res.status(404).json({ error: 'Disorder not found' });
    }

    const logIndex = disorder.intensityLogs.findIndex(log => log.date.toDateString() === new Date(date).toDateString());

    if (logIndex === -1) {
      return res.status(404).json({ error: 'Intensity log not found' });
    }

    disorder.intensityLogs[logIndex].intensity = intensity;

    await disorder.save();

    res.status(200).json({ message: 'Intensity log updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/delete-intensity-log', async (req, res) => {
  const { disorderId, date } = req.body;

  try {
    const disorder = await Disorder.findById(disorderId);

    if (!disorder) {
      return res.status(404).json({ error: 'Disorder not found' });
    }

    disorder.intensityLogs = disorder.intensityLogs.filter(log => log.date.toDateString() !== new Date(date).toDateString());

    await disorder.save();

    res.status(200).json({ message: 'Intensity log deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route to get disorders by email
router.get('/get-disorders', async (req, res) => {
  const { email } = req.query;

  try {
    // Find disorders by email
    const disorders = await Disorder.find({ email });

    // Return the list of disorders as JSON response
    res.status(200).json(disorders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving disorders.' });
  }
});

// Update a disorder
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, dateDiagnosed } = req.body;

  try {
    const updatedDisorder = await Disorder.findByIdAndUpdate(id, { name, dateDiagnosed }, { new: true });

    if (!updatedDisorder) {
      return res.status(404).json({ error: 'Disorder not found' });
    }

    res.status(200).json({ message: 'Disorder updated successfully', updatedDisorder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a disorder
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDisorder = await Disorder.findByIdAndDelete(id);

    if (!deletedDisorder) {
      return res.status(404).json({ error: 'Disorder not found' });
    }

    res.status(200).json({ message: 'Disorder deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the disorder' });
  }
});



module.exports = router;
