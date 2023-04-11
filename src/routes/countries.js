const express = require("express");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allCountries = await Country.findAll({
    include: {
      model: Activity,
    },
  });
  try {
    if (name) {
      const queryCountry = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Activity,
      });
      if (queryCountry.length === 0) {
        return res.status(404).send("Country Doesnt Exists");
      }
      return res.json(queryCountry);
    } else {
      return res.json(allCountries);
    }
  } catch (error) {
    res.status(500).send("ERROR", error);
  }
});

router.get("/:id", async (req, res) => {
  const idCountry = req.params.id.toUpperCase();
  try {
    const searchCountry = await Country.findByPk(idCountry, {
      include: Activity,
    });
    searchCountry
      ? res.json(searchCountry)
      : res.status(404).send(`${idCountry} Doesnt Exist`);
  } catch (error) {
    return res.status(500).send("ERROR", error);
  }
});

module.exports = router;
