const express = require('express');
const userModel = require('./models/user.model');
const dbConfig = require('./utils/db-config');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;
const app = express();

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, Delete');
  next();
});

// Routes
app.use('/users', require('./routes/user.routes'));

// Handle 404 error
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(404).json({ message: message || 'Resource not found' });
});

// test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application' });
});


// Sync database
dbConfig.sync().then(() => {
  console.log('Database connected');
  // Create express app and listen for requests
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
  .catch(err => {
    console.log(err);
  });