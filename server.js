const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to database
const dbURI =
  'mongodb+srv://hendraaagil:ubZt7QTjeEu8q2L@vote-cluster.knplr.mongodb.net/db_vote';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => app.listen(8000))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send({ author: 'Hendra Agil', text: 'Talk less, do more!' });
});
app.use(authRoutes);
