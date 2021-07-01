const express = require("express");
const { PrismaClient } = require("@prisma/client");
const articleUsageRouter = express.Router();
const prisma = new PrismaClient();

//  GET all articles used during every service
articleUsageRouter.get("/", async (req, res, next) => {
  try {
    const totalArticleUsage = await prisma.articleUsage.findMany({
      include: { article: true, service: true, person: true }, // Shows included tables in the result JSON
    });
    res.send(totalArticleUsage);
  } catch (error) {
    next(error);
  }
});

// GET all articles used during one service by service uuid
articleUsageRouter.get("/uuid", async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const foundArticleUsage = await prisma.articleUsage.findUnique({
      where: { uuid },
      include: { article: true, person: true },
    });
    if (!foundArticleUsage) {
      res.status(404).send();
    } else {
      res.send(foundArticleUsage);
    }
  } catch (error) {
    next(error);
  }
});

// POST a new article-usage
articleUsageRouter.post("/", async (req, res, next) => {
  try {
    const {serviceUuid, articleId, quantity, firstName, lastName} = req.body;
    const newArticleUsage = await prisma.articleUsage.create({
      data: {
        quantity: parseInt(quantity),
        time: new Date().toISOString(), // TODO Change into variable when Frontend is implemented
        service: {
          connect: {uuid: serviceUuid}
        },
        article: {
          connect: {id: parseInt(articleId)}
        },
        person: {
          connectOrCreate: {
            where: {full_name: {firstName, lastName}},
            create: {firstName, lastName}
          }
        }
      }
    });
    res.status(201).send(newArticleUsage);
  } catch (error) {
    next(error);
  }
});

module.exports = articleUsageRouter;
