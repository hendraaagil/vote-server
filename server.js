const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send({ author: 'Hendra Agil', text: 'Talk less, do more!' });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started successfully at port ${port}!`);
});
