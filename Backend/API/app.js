const express = require('express');
const {PrismaClient} = require('@prisma/client');
const morgan = require('morgan');
const app = express();
const prisma = new PrismaClient()
const PORT = process.env.PORT || 8081

//Parse the bodies of incoming requests as json-data
app.use(express.json());

//Log every request using morgan
app.use(morgan('dev'));

// Proves that the server works fine by responding with 'Test'
app.get('/', async (req, res, next) => {
    const messages = await prisma.test.findMany();
    res.send(messages);
})

app.get('/:id', async(req, res, next) => {
    const id = Number(req.params.id);
    const message = await prisma.test.findUnique({
        where: {id}
    });
    res.send(message);
})

app.post('/', async (req, res, next) => {
    const newMessage = await prisma.test.create({data:{message: req.body.message}});
    res.status(201).send(newMessage);
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})