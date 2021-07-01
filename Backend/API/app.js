const express = require('express');
const {PrismaClient} = require('@prisma/client');
const morgan = require('morgan');
const app = express();
const prisma = new PrismaClient()
const PORT = process.env.PORT || 8081


const apiRouter = require('./api/api')

//Parse the bodies of incoming requests as json-data
app.use(express.json());

//Log every request using morgan
app.use(morgan('dev'));

// Navigate further through the api from here
app.use('/api', apiRouter)
  
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error.message); // Internal server error
})

// Dummy-message on default url
app.get('/', async (req, res, next) => {
  res.send('Will later host the web-app under this url');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
});