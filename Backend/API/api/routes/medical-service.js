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
          include: { medicalService: true, address: true, responsible: true },
          where: { active: 1 },
        });
      } else if (req.query.active === "false") {
        //GET non-active medical-services
        medicalServices = await prisma.service.findMany({
          where: { active: 0 },
          include: { medicalService: true, address: true, responsible: true },
        });
      }
    } else {
      // GET all medical-services
      medicalServices = await prisma.service.findMany({
        include: { medicalService: true, address: true, responsible: true },
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
      include: { medicalService: true, address: true, responsible: true },
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
    let newMedicalService, title, start, end, firstName, lastName, number, contactPerson, annotations, address, street, houseNumber, postalCode, city;

    if(req.body) {
      title = req.body.title;
      start = req.body.start;
      end = req.body.end;
    }

    if(req.body.responsible) {
      firstName = req.body.responsible.firstName;
      lastName = req.body.responsible.lastName;
    }

    if(req.body.medicalService) {
      number = req.body.medicalService.number,
      contactPerson = req.body.medicalService.contactPerson;
      annotations = req.body.medicalService.annotations;
    }

    if(req.body.address) {
      address = req.body.address.address;
      street = req.body.address.street;
      houseNumber = req.body.address.houseNumber;
      postalCode = req.body.address.postalCode;
      city = req.body.address.city;
    }

    if (!req.body.address && !req.body.medicalService) {
      newMedicalService = await prisma.service.create({
        data: {
          title,
          start: new Date(start),
          end: new Date(end),
          responsible: {
            connectOrCreate: {
              where: {full_name: {firstName, lastName}},
              create: {firstName, lastName}
            }
          }
        },
        include: {address: true, medicalService: true, responsible: true}
      });
    } else if (!req.body.address && req.body.medicalService) {
      newMedicalService = await prisma.service.create({
        data: {
          title,
          start: new Date(start),
          end: new Date(end),
          responsible: {
            connectOrCreate: {
              where: {full_name: {firstName, lastName}},
              create: {firstName, lastName}
            }
          },
          medicalService: {
            create: {number, contactPerson, annotations}
          }
        },
        include: {address: true, medicalService: true, responsible: true}
      });
    } else if (req.body.address && !req.body.medicalService) {
      newMedicalService = await prisma.service.create({
        data: {
          title,
          start: new Date(start),
          end: new Date(end),
          responsible: {
            connectOrCreate: {
              where: {full_name: {firstName, lastName}},
              create: {firstName, lastName}
            }
          },
          address: {
            connectOrCreate: {
              where: {address},
              create: {address, street, houseNumber, postalCode, city}
            }
          }
        },
        include: {address: true, medicalService: true, responsible: true}
      });
    } else {
      newMedicalService = await prisma.service.create({
        data: {
          title,
          start: new Date(start),
          end: new Date(end),
          responsible: {
            connectOrCreate: {
              where: {full_name: {firstName, lastName}},
              create: {firstName, lastName}
            }
          },
          medicalService: {
            create: {number, contactPerson, annotations}
          },
          address: {
            connectOrCreate: {
              where: {address},
              create: {address, street, houseNumber, postalCode, city}
            }
          }
        },
        include: {address: true, medicalService: true, responsible: true}
      });
    }
    res.status(201).send(newMedicalService);
  } catch (error) {
    next(error);
  }
});

//TODO Implement PUT

// DELETE one specific medical-service by its uuid
medicalServiceRouter.delete('/:uuid', async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    await prisma.service.delete({
      where: {uuid}
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
})

module.exports = medicalServiceRouter;
