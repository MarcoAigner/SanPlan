const express = require("express");
const { PrismaClient } = require("@prisma/client");
const resetRouter = express.Router();
const prisma = new PrismaClient();

// DELETE everything 💥
resetRouter.get('/', async (req, res, next) => {
  try {
    const now = new Date()
    await prisma.articleUsage.deleteMany();
    await prisma.medicalService.deleteMany();
    await prisma.service.deleteMany();

    const newService = await prisma.service.create({
      data: {
        title: 'Basketball: Ulm vs. Oldenburg',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        responsible: {
          connect: {id: 1}
        },
        medicalService: {
          create: {
            number: '#1/21'
          }
        }
      }
    });

    const articleUsages = await prisma.articleUsage.createMany({
      data: [
        {
          articleId: 235,
          personId: 1,
          quantity: 1,
          time: new Date().toISOString(),
          serviceId: newService.id
        },
        {
          articleId: 144,
          personId:2,
          quantity: 1,
          time: new Date().toISOString(),
          serviceId: newService.id
        }
      ]
    });
    
    res.status(200).send(articleUsages);
  } catch (error) {
    next(error);
  }
})

module.exports = resetRouter;
