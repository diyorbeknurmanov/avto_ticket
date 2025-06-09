const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/drivers.controller");

const driver_routes = require("express").Router();

driver_routes.post("/", create);
driver_routes.get("/", getAll);
driver_routes.get("/:id", getOne);
driver_routes.patch("/:id", update);
driver_routes.delete("/:id", remove);

module.exports = driver_routes;
