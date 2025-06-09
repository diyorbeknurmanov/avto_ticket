const { sendErrorResponse } = require("../helpers/send_error_response");
const Buses = require("../models/buses.model");
const Driver = require("../models/drivers.model");

const create = async (req, res) => {
  try {
    const { number_plate, seat_count, model } = req.body;
    const newBus = await Buses.create({ number_plate, seat_count, model });
    res.status(201).send({ message: "Bus created", bus: newBus });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const buses = await Buses.findAll({
      include: [
        { model: Driver, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    res.status(200).send({ buses });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Buses.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!bus) {
      return res.status(404).send({ message: "Bus not found" });
    }
    res.status(200).send({ bus });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const bus = await Buses.findByPk(id);
    if (!bus) {
      return res.status(404).send({ message: "Bus not found" });
    }
    await bus.update(updateData);
    res.status(200).send({ message: "Bus updated", bus });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Buses.findByPk(id);
    if (!bus) {
      return res.status(404).send({ message: "Bus not found" });
    }
    await bus.destroy();
    res.status(200).send({ message: "Bus deleted", bus });
  } catch (error) {
    sendErrorResponse(error, req, 400);
  }
};

module.exports = { create, getAll, getOne, update, remove };
