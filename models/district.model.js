const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Region = require("./region.model");

const District = sequelize.define(
  "district",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Region.hasMany(District);
District.belongsTo(Region);

module.exports = District;
