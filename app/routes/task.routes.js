module.exports = app => {
    const tasksController = require("../controllers/task.controller.js");
    
    var router = require("express").Router();
    
    // Retrieve all Tasks
    router.get("/get-all", tasksController.findAll);
    router.post("/create", tasksController.save);
    router.delete("/delete", tasksController.deleteById);
    router.put("/update-task/:id", tasksController.update);
    router.delete("/delete-all", tasksController.deleteAll);
    
    app.use('/api/tasks', router);
}