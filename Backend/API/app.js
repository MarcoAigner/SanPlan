const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8081

//Parse the bodies of incoming requests as json-data
app.use(express.json());

//Log every request using morgan
app.use(morgan('dev'));

// Proves that the server works fine by responding with 'Test'
app.get('/', (req, res, next) => {
    res.send('Test');
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})