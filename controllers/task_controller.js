const { QueryTypes } = require("sequelize");
const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Operasi CREATE (Membuat Catatan Tugas Kuliah)
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Your task note cannot be empty!"
    });
    return;
  }

  // Body JSON yang akan dijadikan sebagai parameter pengiriman data ke database 
  const task = {
    title: req.body.title,
    course: req.body.course,
    description: req.body.description,
    meeting: req.body.meeting,
    deadlineDate: req.body.deadlineDate,
    deadlineTime: req.body.deadlineTime ? req.body.deadlineTime : "23.50 WIB",
    doingBy: req.body.doingBy,
    media: req.body.media ? req.body.media : "SPOT UPI",
    isDone: req.body.isDone ? req.body.isDone : false
  };

  Task.create(task)
    .then(data => {
      res.send({message: "Your task successfully created!"});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating task note!"
      });
    });
};

// Operasi READ (Membaca Catatan Tugas Kuliah, baik secara langsung maupun dari berdasarkan nama mata kuliah)
exports.findAll = (req, res) => {
  const course = req.query.course;
  var condition = course ? { course: { [Op.iLike]: `%${course}%` } } : null;

  Task.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Task notes!"
      });
    });
};

// Operasi READ (Membaca Catatan Tugas Kuliah berdasarkan pertemuan ke-n)
exports.findMeeting = (req, res) => {
  const meeting = req.query.meeting;
  var condition = meeting ? { meeting: { [Op.iLike]: `%${meeting}%` } } : null;

  Task.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Task notes!"
      });
    });
};


// Operasi READ (Membaca Data Catatan Tugas Kuliah berdasarkan ID)
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Not Found any Task note with id = " + id
      });
    });
};



// Operasi UPDATE (Memperbaharui Data pada Catatan Tugas Kuliah berdasarkan ID)
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id = " + id
      });
    });
};

// Operasi DELETE (Menghapus Data Catatan Tugas Kuliah berdasarkan ID)
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
};

// Operasi DELETE (Menghapus Semua Data Catatan Tugas Kuliah)
exports.deleteAll = (req, res) => {
  Task.destroy({
    where: {},
    truncate: true
  })
    .then(nums => {
      res.send({ message: `${nums} Tasks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tasks."
      });
    });
};