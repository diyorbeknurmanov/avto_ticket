const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Buses = sequelize.define(
    "buses",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        number_plate: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        seat_count: {
            type: DataTypes.INTEGER,
        },
        model: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Buses;
