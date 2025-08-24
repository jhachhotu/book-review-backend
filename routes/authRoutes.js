const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

console.log("✅ authRoutes.js loaded");

// Test routes
router.get('/test', (req, res) => {
  res.send('Login route works!');
});

router.post('/check', (req, res) => {
  console.log("🔥 POST /check hit!");
  res.send('Check route working!');
});

// Actual routes
router.post('/signup', signup);

// ⬇️ Wrap login call in a function to ensure it logs properly
router.post('/login', (req, res) => {
  console.log("📩 POST /login hit in route!");
  login(req, res);
});

module.exports = router;
