const { sendErrorResponse } = require("../helpers/send_error_response");
const BusDriver = require("../models/bus-driver.model");
const Buses = require("../models/buses.model");
const Driver = require("../models/drivers.model");

const create = async (req, res) => {
  try {
    const { driverId, busesId } = req.body;

    const driver = await Driver.findOne({ where: { id: driverId } });
    if (!driver) {
      return sendErrorResponse(
        { message: "Bunday driver mavjud emas" },
        res,
        400
      );
    }

    const buses = await Buses.findOne({ where: { id: busesId } });
    if (!buses) {
      return sendErrorResponse({ message: "Bunday bus mavjud emas" }, res, 400);
    }

    const existing = await BusDriver.findOne({
      where: { driverId, busesId },
    });
    if (existing) {
      return sendErrorResponse(
        { message: "Bu bog‘lanish allaqachon mavjud" },
        res,
        400
      );
    }

    const newDriverBus = await BusDriver.create({ driverId, busesId });

    res.status(201).json({
      message: "BusDriver bog‘lanish yaratildi",
      data: newDriverBus,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await BusDriver.findAll({
      include: [
        { model: Driver, attributes: ["name"] },
        { model: Buses, attributes: ["number_plate"] },
      ],
    });
    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await BusDriver.findByPk(id, {
      include: [
        { model: Driver, attributes: ["name"] },
        { model: Buses, attributes: ["number_plate"] },
      ],
    });

    if (!data) {
      return res.status(404).send({ message: "BusDriver not found" });
    }

    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    const { busId, driverId } = req.body;

    // Bus mavjudligini tekshirish
    const bus = await Buses.findByPk(busId);
    if (!bus) {
      return sendErrorResponse(
        { message: "Bunday avtobus mavjud emas" },
        res,
        400
      );
    }

    // Haydovchi mavjudligini tekshirish
    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return sendErrorResponse(
        { message: "Bunday haydovchi mavjud emas" },
        res,
        400
      );
    }

    // Bog‘langanligini tekshirish
    const relation = await BusDriver.findOne({
      where: { busId, driverId },
    });

    if (!relation) {
      return sendErrorResponse(
        { message: "Bu haydovchi bu avtobusga biriktirilmagan" },
        res,
        400
      );
    }

    // O‘chirish
    await BusDriver.destroy({
      where: { busId, driverId },
    });

    res.status(200).send({
      message: "Haydovchi avtobusdan ajratildi",
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { driverId, busesId } = req.body;

  try {
    const busDriver = await BusDriver.findByPk(id);
    if (!busDriver) {
      return sendErrorResponse({ message: "BusDriver topilmadi" }, res, 404);
    }

    // driver tekshirish
    if (driverId) {
      const driver = await Driver.findByPk(driverId);
      if (!driver) {
        return sendErrorResponse(
          { message: "Yangi driver topilmadi" },
          res,
          400
        );
      }
    }

    // bus tekshirish
    if (busesId) {
      const buses = await Buses.findByPk(busesId);
      if (!buses) {
        return sendErrorResponse({ message: "Yangi bus topilmadi" }, res, 400);
      }
    }

    await busDriver.update({ driverId, busesId });

    res.status(200).send({ message: "Bog‘lanish yangilandi", data: busDriver });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
