const express = require("express");
const { Country, Activity, Country_activities } = require("../db");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const findActivity = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    return res.json(findActivity);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, difficult, duration, season, country } = req.body;

    const newActivity = await Activity.create({
      name,
      difficult,
      duration,
      season,
    });

    country.forEach(async (country) => {
      const activityCountry = await Country.findOne({
        where: {
          name: country,
        },
      });
      await newActivity.addCountry(activityCountry);
    });
    res.status(200).send("Activity created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Activity cant be created ", error);
  }
});

router.put("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { countryId } = req.body;

    const activityToDelete = await Activity.findOne({
      where: {
        id: id,
      },
      include: {
        model: Country,
      },
    });

    const countries = [];

    activityToDelete.countries.forEach((e) => {
      if (e.id !== countryId) countries.push(e.id);
    });

    await activityToDelete.setCountries(countries);

    if (!activityToDelete) {
      return res.status(404).send("Activity not found");
    }

    if (activityToDelete.countries.length === 1) {
      activityToDelete.destroy();
      res.send("Activity deleted successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, difficult, duration, season } = req.body;
    let updateActivity = await Activity.findOne({
      where: {
        id: id,
      },
    });
    await updateActivity.update({
      name: name,
      difficult: difficult,
      duration: duration,
      season: season,
    });
    res.send(updateActivity);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
