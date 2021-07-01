const express = require('express');
const {PrismaClient} = require('@prisma/client');
const apiRouter = express.Router();
const prisma = new PrismaClient();

const articleRouter = require('./routes/article');
const personRouter = require('./routes/person');
const medicalServiceRouter = require('./routes/medical-service');
const articleUsageRouter = require('./routes/article-usage');

apiRouter.use('/article', articleRouter);
// apiRouter.use('/person', personRouter); Should this be directly accessible via the api?!
apiRouter.use('/medical-service', medicalServiceRouter);
apiRouter.use('/article-usage', articleUsageRouter);

apiRouter.get('/', (req, res) => {
  res.send('Reached the api endpoint');
});


module.exports = apiRouter;