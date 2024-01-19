import Task from "../models/Task";
import { validateObjectId} from "../utils/validation.js"

exports.geTasks = async (req, res) => {
 try{
    const tasks = await Task.find({user: req.user.id});
    res.status(200).json({tasks, status: true, msg: "Task found successfully.." });
 }
 catch(err){
    console.error(err);
    return res. status(500).json({status: false, msg: "Intermal server error"});
 }
}

exports.getTask = async (req, res) => {
    try{
        if(!validateObjectId(req.params.taskId)) {
            return res.status(400).json({status: false, msg: "Task id not valid"});
        }
        const task = await Task.findOne({user: req.user.id, _id: req.params.taskId});
        if(!task) {
            return res.status(400).json({status: false, msg: "No task found.."});
        }
            return res.status(200).json({task,status: true, msg: "Task found sucessfully.."});
         }
         catch (err) {
            console.error(err);
            return res.status (500).json({status: false, msg: "Internal server error"});
         }
}
   
exports.putTask = async (req, res) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.status(400).json({ status: false, msg: "Description of task not found" });
      }
  
      if (!validateObjectId(req.params.taskId)) {
        return res.status(400).json({ status: false, msg: "Task id not valid" });
      }
  
      let task = await Task.findById(req.params.taskId);
      if (!task) {
        return res.status(400).json({ status: false, msg: "Task with given id not found" });
      }
  
      if (task.user != req.user.id) {
        return res.status(403).json({ status: false, msg: "You can't update task of another user" });
      }
  
      task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true });
      res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }
  
  exports.deleteTask = async (req,res) => {
    try{
    if(!validateObjectId(req.params.taskId)) {
        return res.status(400).json({status: false, msg:"Task id not valid"})
    }
    let task = await Task.findById(req.params.taskId);
    if(!task) {
        return res.status(400).json({ status: false, msg: "Task with given id not found"});
    }
    if(task.user != req.user.id) {
        return res.status(403).json({status: false, msg:"You cant delete task of another user"});
    }
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({status: true, msg:"You have deleted the task succesfully"})

    }
    catch(err) {
    console.error(err);
    return res.status(500).json({status: false, msg: "Internal Server Error"});
    }
  }
  