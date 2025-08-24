const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  console.log("✅ Mounting /api/auth routes...");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error(err);
});


 