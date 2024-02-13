const db = require("../models");
const TaskDB = db.tasks
exports.findAll = (req, res) => {
 
  TaskDB.find({})
      .then(data => {
        
        console.log("ceva doamne te rog")
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  
  //body: {title:string, description:string}
  exports.save = (req, res) =>{

    if (!req.body.title) {
      res.status(400).send({ message: "Task must have a title!" });
      return;
    }
    // the repo will act also like an object => model
    const task = new TaskDB({
      title:req.body.title,
      description:req.body.description,
      done:false
    })
    // as the "task" object is also a repo it will save itself
    task
    .save(task)
    .then (data => {
      res.send(data)
    })
    .catch (err =>{
      res.status(500).send({message:"Something went wrong when trying to create this task"})
    })
  }

  exports.findOne = (req, res) => {
    const id = req.params.id;

    TaskDB.findById(id)
    .then(data =>{
      if(!data){
        res.status(404).send({message:`No Task with id:${id} found`})
      }
      else res.send(data)
    })
    .catch(err => {
      res.status(500)
      .send({message:`Something went wrong when searching for Task with id:${id}`});
    })
  }

  exports.deleteById = (req,res ) =>{
   
      TaskDB.findByIdAndDelete(req.body.id) 
      .then(data => {
        if (!data) {
          res.status(404).send({
            message:`Task with id:${req.body.id} was not found for deletion!`
          })
        }
        else {
          res.send({message:"Task deleted successfully!"})
        }
      })
      .catch(err =>{
        res.status(500).send({message:`Could not delete tutorial with id:${req.body.id}`})
      })
      
    }

exports.update = (req, res) =>{
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  TaskDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`
        });
      } else res.send({ message: "Task was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });

  
}
exports.deleteAll = (req, res) =>{
  TaskDB.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Tutorials were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  });
}
  
