const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/district.controller");

const district_routes = require("express").Router();

district_routes.post("/", create);
district_routes.get("/", getAll);
district_routes.get("/:id", getOne);
district_routes.patch("/:id", update);
district_routes.delete("/:id", remove);

module.exports = district_routes;
