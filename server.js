require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// Routing
app.get('/', (req, res) => {
  res.send({ author: 'Hendra Agil', text: 'Talk less, do more!' });
});
app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(candidateRoutes);

// Connect to database
const run = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

run();
