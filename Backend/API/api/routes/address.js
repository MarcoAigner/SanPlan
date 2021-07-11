const express = require("express");
const { PrismaClient } = require("@prisma/client");
const addressRouter = express.Router();
const prisma = new PrismaClient();

// GET all addresses
addressRouter.get('/', async(req, res, next) => {
  console.log('hi there')
  try {
    const addresses = await prisma.address.findMany({
      orderBy: {timesUsed: 'desc'}
    });
    res.send(addresses);
  } catch (error) {
    next(error);
  }
})

module.exports = addressRouter;