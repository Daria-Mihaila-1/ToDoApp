module.exports = app => {
    const tasksController = require("../controllers/task.controller.js");
    
    var router = require("express").Router();
    
    // Retrieve all Tasks
    router.get("/get-all", tasksController.findAll);
    router.get("/find-by-id/:id", tasksController.findOne);

    router.post("/create", tasksController.save);
    
    router.delete("/delete", tasksController.deleteById);
    router.delete("/delete-all", tasksController.deleteAll);

    router.put("/update-task/:id", tasksController.update);
    
    
    app.use('/api/tasks', router);
}