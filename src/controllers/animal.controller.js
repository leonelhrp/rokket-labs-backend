const db = require('../models');
const Animal = db.animals;

// Create and Save a new Animal
const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Animal
  const animal = new Animal({
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Animal in the database
  animal
    .save(animal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Animal.'
      });
    });
};

// Retrieve all Animals from the database.
const findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {};

  Animal.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving animals.'
      });
    });
};

// Find a single Animal with an id
const findOne = (req, res) => {
  const id = req.params.id;

  Animal.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Animal with id=${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Animal with id=${id}` });
    });
};

// Update a Animal by the id in the request
const updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!'
    });
  }

  const id = req.params.id;

  Animal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Animal with id=${id}. Maybe Animal was not found!`
        });
      } else res.send({ message: 'Animal was updated successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Animal with id=${id}`
      });
    });
};

// Delete a Animal with the specified id in the request
const deleteById = (req, res) => {
  const id = req.params.id;

  Animal.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Animal with id=${id}. Maybe Animal was not found!`
        });
      } else {
        res.send({
          message: 'Animal was deleted successfully!'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Animal with id=${id}`
      });
    });
};

// Delete all Animals from the database.
const deleteAll = (req, res) => {
  Animal.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Animals were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all animals.'
      });
    });
};

// Find all published Animals
const findAllPublished = (req, res) => {
  Animal.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving animals.'
      });
    });
};

export {
  create,
  findAll,
  findOne,
  updateById,
  deleteById,
  deleteAll,
  findAllPublished
}