module.exports = app => {
  const animals = require("../controllers/animal.controller.js");

  const router = require("express").Router();

  // Create a new Animal
  router.post("/", animals.create);

  // Retrieve all Animals
  router.get("/", animals.findAll);

  // Retrieve all published Animals
  router.get("/published", animals.findAllPublished);

  // Retrieve a single Animal with id
  router.get("/:id", animals.findOne);

  // Update a Animal with id
  router.put("/:id", animals.updateById);

  // Delete a Animal with id
  router.delete("/:id", animals.deleteById);

  // Create a new Animal
  router.delete("/", animals.deleteAll);

  app.use("/api/animals", router);
};
