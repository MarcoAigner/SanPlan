const express = require('express');
const {PrismaClient} = require('@prisma/client');
const apiRouter = express.Router();
const prisma = new PrismaClient();

const articleRouter = require('./routes/article');

apiRouter.use('/article', articleRouter);

apiRouter.get('/', (req, res) => {
  res.send('Reached the api endpoint');
});


module.exports = apiRouter;