const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Driver = require("./drivers.model");
const Buses = require("./buses.model");

const BusDriver = sequelize.define(
  "bus_driver",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    driverId: {
      type: DataTypes.INTEGER,
      references: {
        model: Driver,
        key: "id",
      },
    },
    busesId: {
      type: DataTypes.INTEGER,
      references: {
        model: Buses,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Driver.belongsToMany(Buses, {
  through: BusDriver,
  foreignKey: "driverId",
});
Buses.belongsToMany(Driver, {
  through: BusDriver,
  foreignKey: "busesId",
});

BusDriver.belongsTo(Driver, { foreignKey: "driverId" });
BusDriver.belongsTo(Buses, { foreignKey: "busesId" });

module.exports = BusDriver;
