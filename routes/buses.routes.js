const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/buses.controller");

const buses_routes = require("express").Router();

buses_routes.post("/", create);
buses_routes.get("/", getAll);
buses_routes.get("/:id", getOne);
buses_routes.patch("/:id", update);
buses_routes.delete("/:id", remove);

module.exports = buses_routes;
