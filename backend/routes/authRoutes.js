const router = require('express').Router();
const User = require('../models/User');

// Route for signing up
router.route('/signup').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if the user already exists
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json('User already exists');
      }

      // If the user doesn't exist, save the new user
      const newUser = new User({ email, password });
      return newUser.save()
        .then(() => res.json('User signed up successfully!'));
    })
    .catch(err => res.status(400).json('Error signing up: ' + err));
});

// Route for logging in
router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // Check if user exists with the provided email and password
    User.findOne({ email, password })
      .then(user => {
        if (!user) {
          return res.status(401).json('Invalid credentials'); // User with provided email and password not found
        }
  
        // Send message indicating successful login
        res.json('User logged in successfully!');
  
      })
      .catch(err => res.status(400).json('Error logging in: ' + err));
});

// Route for handling forgot password requests
router.post('/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's password
    user.password = newPassword;
    
    // Save the updated user
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;