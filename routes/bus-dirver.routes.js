const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/bus-driver.controller");

const bus_driver_routes = require("express").Router();

bus_driver_routes.post("/", create);
bus_driver_routes.get("/", getAll);
bus_driver_routes.get("/:id", getOne);
bus_driver_routes.patch("/:id", update);
bus_driver_routes.delete("/:id", remove);

module.exports = bus_driver_routes;
