const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/region.controller");

const region_routes = require("express").Router();

region_routes.post("/", create);
region_routes.get("/", getAll);
region_routes.get("/:id", getOne);
region_routes.patch("/:id", update);
region_routes.delete("/:id", remove);

module.exports = region_routes;
