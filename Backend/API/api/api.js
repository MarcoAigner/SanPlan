const express = require('express');
const {PrismaClient} = require('@prisma/client');
const apiRouter = express.Router();
const prisma = new PrismaClient();

const articleRouter = require('./routes/article');
const personRouter = require('./routes/person');
const medicalServiceRouter = require('./routes/medical-service');
const articleUsageRouter = require('./routes/article-usage');
const addressRouter = require('./routes/address')
const resetRouter = require('./routes/reset')

apiRouter.use('/article', articleRouter);
apiRouter.use('/address', addressRouter);
// apiRouter.use('/person', personRouter); Should this be directly accessible via the api?!
apiRouter.use('/medical-service', medicalServiceRouter);
apiRouter.use('/article-usage', articleUsageRouter);
apiRouter.use('/reset', resetRouter);

apiRouter.get('/', (req, res) => {
  res.send('Reached the api endpoint');
});


module.exports = apiRouter;