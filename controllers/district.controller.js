const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Region = require("../models/region.model");

const create = async (req, res) => {
  try {
    const { name, regionId } = req.body;

    const region = await Region.findByPk(regionId);
    if (!region) {
      return sendErrorResponse(
        { message: "Bunday region mavjud emas" },
        res,
        400
      );
    }

    const exists = await District.findOne({ where: { name, regionId } });
    if (exists) {
      return sendErrorResponse(
        { message: "Bu tuman allaqachon mavjud" },
        res,
        400
      );
    }

    const newDistrict = await District.create({ name, regionId });
    res.status(201).send({ message: "Tuman yaratildi", data: newDistrict });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const districts = await District.findAll({
      include: [{ model: Region, attributes: ["name"] }],
    });
    res.status(200).send({ data: districts });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const district = await District.findByPk(id, {
      include: [{ model: Region, attributes: ["name"] }],
    });
    if (!district) {
      return sendErrorResponse({ message: "Tuman topilmadi" }, res, 404);
    }
    res.status(200).send({ data: district });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, regionId } = req.body;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return sendErrorResponse({ message: "Tuman topilmadi" }, res, 404);
    }

    if (regionId) {
      const region = await Region.findByPk(regionId);
      if (!region) {
        return sendErrorResponse(
          { message: "Bunday region mavjud emas" },
          res,
          400
        );
      }
    }

    await district.update({ name, regionId });
    res.status(200).send({ message: "Tuman yangilandi", data: district });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return sendErrorResponse({ message: "Tuman topilmadi" }, res, 404);
    }

    await district.destroy();
    res.status(200).send({ message: "Tuman o'chirildi", data: district });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = { create, getAll, getOne, update, remove };
