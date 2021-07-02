const express = require("express");
const { PrismaClient } = require("@prisma/client");
const articleRouter = express.Router();
const prisma = new PrismaClient();

articleRouter.get("/", async (req, res, next) => {
  try {
    let articles = await prisma.article.findMany();
    articles = formatArticles(articles);
    console.log(JSON.stringify(articles, null, 2));
    res.send(articles);
  } catch (error) {
    next(error); // Global error-handling in app.js
  }
});

function formatArticles(unformattedArticles) {
  let formattedArticles = []; //helper-array

  // Cycle through the complete array of articles,
  unformattedArticles.forEach((article) => {
    // for every article 'super-category' add its name and an empty array of units
    // to the helper-array
    if (!formattedArticles.some((el) => el.name == article.name)) {
      formattedArticles.push({ name: article.name, units: [] });
    }

    // Current element within the helper-array
    let currentEl = formattedArticles.find((el) => el.name === article.name);

    // Push every article's unit once into the helper-array's units-array
    if (!currentEl.units.includes((unit) => unit.name == article.unit)) {
      currentEl.units.push({
        id: article.id,
        unit: article.unit,
        description: article.description,
      });
    }
  });
  return formattedArticles;
}

module.exports = articleRouter;
