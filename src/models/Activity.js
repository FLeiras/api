const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficult: {
        type: DataTypes.ENUM({
          values: ["1", "2", "3", "4", "5"],
        }),
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      season: {
        type: DataTypes.ENUM(
          "Verano",
          "Invierno",
          "Primavera",
          "Otoño",
          "Todo el año"
        ),
        defaultValue: "Todo el año",
      },
    },
    {
      timestamps: false,
    }
  );
};
