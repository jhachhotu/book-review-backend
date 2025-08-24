const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://book-review-frontend-xl5k.vercel.app/' // Replace with your frontend URL
    : 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

// Routes will be added here
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/books', reviewRoutes);



app.get('/', (req, res) => {
res.send('Book Review Platform API');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    
    // Start the server after successful DB connection
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });