const sequelize = require("../config/db");
const { DataTypes, STRING } = require("sequelize");

const Driver = sequelize.define(
    "driver",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        phone: {
            type: STRING(20),
            allowNull: false,
            validate: {
                is: /^\+998\d{9}$/,
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Driver;
