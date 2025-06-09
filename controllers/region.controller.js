const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Region = require("../models/region.model");

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Region.findOne({ where: { name } });
    if (exists) {
      return sendErrorResponse(
        { message: "Bu region allaqachon mavjud" },
        res,
        400
      );
    }
    const newRegion = await Region.create({ name });
    res.status(201).send({ message: "Region yaratildi", data: newRegion });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const regions = await Region.findAll({
      include: [{ model: District, attributes: ["name"] }],
    });
    res.status(200).send({ data: regions });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const region = await Region.findByPk(id, {
      include: [{ model: District, attributes: ["name"] }],
    });
    if (!region) {
      return sendErrorResponse({ message: "Region topilmadi" }, res, 404);
    }
    res.status(200).send({ data: region });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const region = await Region.findByPk(id);
    if (!region) {
      return sendErrorResponse({ message: "Region topilmadi" }, res, 404);
    }
    await region.update({ name });
    res.status(200).send({ message: "Region yangilandi", data: region });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const region = await Region.findByPk(id);
    if (!region) {
      return sendErrorResponse({ message: "Region topilmadi" }, res, 404);
    }
    await region.destroy();
    res.status(200).send({ message: "Region o'chirildi", data: region });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { create, getAll, getOne, update, remove };
