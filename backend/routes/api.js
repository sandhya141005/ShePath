const express = require('express');
const Intern = require('../models/intern');
const router = express.Router();

// Sample data for demonstration (you can replace this with actual DB queries)
const sampleInternData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  referralCode: "alex2025",
  donationsRaised: 750,
  goal: 1000,
  joinedDate: new Date('2025-01-15'),
  rewards: [
    { name: "First Donation", unlocked: true, threshold: 100 },
    { name: "Rising Star", unlocked: true, threshold: 500 },
    { name: "Goal Crusher", unlocked: false, threshold: 1000 },
    { name: "Super Achiever", unlocked: false, threshold: 1500 }
  ]
};

const sampleLeaderboard = [
  { name: "Sarah Chen", donationsRaised: 1200, position: 1 },
  { name: "Mike Rodriguez", donationsRaised: 950, position: 2 },
  { name: "Alex Johnson", donationsRaised: 750, position: 3 },
  { name: "Emma Wilson", donationsRaised: 650, position: 4 },
  { name: "David Kim", donationsRaised: 480, position: 5 }
];

// Get intern data
router.get('/intern/:id', async (req, res) => {
  try {
    // For demo purposes, return sample data
    // In production, you'd query: const intern = await Intern.findById(req.params.id);
    res.json(sampleInternData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current intern data (for logged in user)
router.get('/intern', async (req, res) => {
  try {
    // Return sample data for demo
    res.json(sampleInternData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    // In production: const leaderboard = await Intern.find().sort({ donationsRaised: -1 }).limit(10);
    res.json(sampleLeaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simple login endpoint (dummy)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Dummy authentication - always succeeds
  if (email && password) {
    res.json({ 
      success: true, 
      message: "Login successful",
      intern: sampleInternData
    });
  } else {
    res.status(400).json({ success: false, message: "Please provide email and password" });
  }
});

// Simple signup endpoint (dummy)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Dummy signup - always succeeds
  if (name && email && password) {
    const newIntern = {
      ...sampleInternData,
      name: name,
      email: email,
      referralCode: name.toLowerCase().replace(/\s+/g, '') + '2025'
    };
    
    res.json({ 
      success: true, 
      message: "Signup successful",
      intern: newIntern
    });
  } else {
    res.status(400).json({ success: false, message: "Please provide all required fields" });
  }
});

module.exports = router;