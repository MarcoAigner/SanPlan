const express = require("express");
const { PrismaClient } = require("@prisma/client");
const medicalServiceRouter = express.Router();
const prisma = new PrismaClient();

// GET all medical-services, optionally all with active=true
medicalServiceRouter.get("/", async (req, res, next) => {
  try {
    let medicalServices;
    if (req.query.active) {
      // query 'active' has been submitted
      if (req.query.active === "true") {
        // GET active medical-services
        medicalServices = await prisma.service.findMany({
          include: { medical_service: true, address: true },
          where: { active: 1 },
        });
      } else if (req.query.active === "false") {
        //GET non-active medical-services
        medicalServices = await prisma.service.findMany({
          where: { active: 0 },
          include: { medical_service: true, address: true },
        });
      }
    } else {
      // GET all medical-services
      medicalServices = await prisma.service.findMany({
        include: { medical_service: true, address: true },
      });
    }
    res.send(medicalServices);
  } catch (error) {
    next(error); // Global error-handling in app.js
  }
});

// GET one specific medical-service by its uuid
medicalServiceRouter.get("/:uuid", async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const foundMedicalService = await prisma.service.findUnique({
      where: { uuid },
      include: { medical_service: true, address: true },
    });
    if (!foundMedicalService) {
      res.status(400).send(`There is no service with uuid "${uuid}"`);
    } //
    res.send(foundMedicalService);
  } catch (error) {
    next(error);
  }
});

// CREATE a new medical-service and return it
medicalServiceRouter.post("/", async (req, res, next) => {
  try {
    const { title, start, end } = req.body;
    const { address, street, houseNumber, postalCode, city } = req.body.address;
    const { number, contactPerson, annotations } = req.body.medicalService;

    const newMedicalService = await prisma.service.create({
      data: {
        title,
        start: new Date(start),
        end: new Date(end),
        active: 1,
        address: {
          connectOrCreate: {
            where: { address },
            create: { address, street, houseNumber, postalCode, city },
          },
        },
        medical_service: {
          create: { number, contactPerson, annotations },
        },
      },
      include: { address: true, medical_service: true },
    });
    res.status(201).send(newMedicalService);
  } catch (error) {
    next(error);
  }
});

//TODO Implement PUT

// TODO Implement DELETE

module.exports = medicalServiceRouter;
