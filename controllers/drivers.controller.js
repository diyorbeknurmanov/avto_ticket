const { sendErrorResponse } = require("../helpers/send_error_response");
const Buses = require("../models/buses.model");
const Driver = require("../models/drivers.model");

const create = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newDriver = await Driver.create({ name, phone });
    res.status(201).send({ message: "Driver created", driver: newDriver });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: [
        {
          model: Buses,
          attributes: ["number_plate"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).send({ drivers });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id, {
      include: [
        {
          model: Buses,
          attributes: ["number_plate"],
          through: { attributes: [] },
        },
      ],
    });
    if (!driver) {
      return res.status(404).send({ message: "Driver not found" });
    }
    res.status(200).send({ driver });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).send({ message: "Driver not found" });
    }
    await driver.update(updateData);
    res.status(200).send({ message: "Driver updated", driver });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      return res.status(404).send({ message: "Driver not found" });
    }
    await driver.destroy();
    res.status(200).send({ message: "Driver deleted", driver });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

module.exports = { create, getAll, getOne, update, remove };
