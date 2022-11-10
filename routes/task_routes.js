module.exports = app => {
    const tasks = require("../controllers/task_controller.js");
  
    var router = require("express").Router();
  
    router.post("/", tasks.create);
  
    router.get("/search", tasks.findAll);
    
    router.get("/meeting/", tasks.findMeeting);
  
    router.get("/:id", tasks.findOne);

    router.put("/:id", tasks.update);

    router.delete("/:id", tasks.delete);

    router.delete("/", tasks.deleteAll);
  
    app.use("/api/tasks", router);
  };