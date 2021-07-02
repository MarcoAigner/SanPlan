const express = require("express");
const { PrismaClient } = require("@prisma/client");
const personRouter = express.Router();
const prisma = new PrismaClient();

personRouter.get('/', async(req, res, next) => {
  try {
    const people = await prisma.person.findMany();
    res.send(people);
  } catch (error) {
    next(error); // Global error-handling in app.js
  }
  
});

module.exports = personRouter;