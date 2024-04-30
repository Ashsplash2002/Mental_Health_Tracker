const router = require('express').Router();
const Disorder = require('../models/Disorder');
const User = require('../models/User'); // Import the User model

// Route for getting all disorders
router.route('/').get((req, res) => {
  Disorder.find()
    .then(disorders => res.json(disorders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
    try {
        const { email, name, severity, diagnosisDate } = req.body; // Update this line to access the email field

        // Find the user by email
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the disorder with the user's ID
        const newDisorder = new Disorder({
            user: existingUser._id, // Assuming _id is the user's ID
            name,
            severity,
            diagnosisDate
        });

        await newDisorder.save();

        res.status(201).json({ message: 'Disorder created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route for getting a single disorder by ID
router.route('/:id').get((req, res) => {
  Disorder.findById(req.params.id)
    .then(disorder => res.json(disorder))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route for deleting a disorder by ID
router.route('/:id').delete((req, res) => {
  Disorder.findByIdAndDelete(req.params.id)
    .then(() => res.json('Disorder deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route for updating a disorder by ID
router.route('/update/:id').post((req, res) => {
  Disorder.findById(req.params.id)
    .then(disorder => {
      disorder.name = req.body.name;
      disorder.severity = req.body.severity;
      disorder.diagnosisDate = Date.parse(req.body.diagnosisDate);

      disorder.save()
        .then(() => res.json('Disorder updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
