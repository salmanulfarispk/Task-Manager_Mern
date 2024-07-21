import Task from "../models/task.js"
import Notification from "../models/notification.js"



export const createTask = async (req, res) => {
    try {

        const { userId } = req.user;

        const { title, priority, date, stage, team, assets } = req.body;

        let text = "New task has been assigned to you";
        if (team?.length > 1) {
            text = text + `and ${team?.length - 1} others.`
        }

        text =
            text +
            ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
                date
            ).toDateString()}. Thank you!!!`;


        const activity = {
            type: "assigned",
            activity: text,
            by: userId
        }

        const task = await Task.create({
            title,
            team,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
            activities: activity
        })

        await task.save();

        await Notification.create({
            team: userId,
            text,
            task: task._id
        })

        res.status(200).json({
            status: true,
            message: "Task created succesfully."
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const DuplicateTask = async (req, res) => {
    try {

        const { id } = req.params;

        const task = await Task.findById(id)

        const newTask = await Task.create({
            ...task,
            title: task.title + '-Duplicate',
        });

        newTask.team = task.team
        newTask.stage = task.stage
        newTask.priority = task.priority
        newTask.assets = task.assets
        newTask.subTasks = task.subTasks

        await newTask.save();

        //alert users of the task
        let text = "New task has been assigned to you";
        if (task.team.length > 1) {
            text = text + ` and ${task.team.length - 1} others.`;
        }

        text =
            text +
            ` The task priority is set a ${task.priority
            } priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`;


          await Notification.create({
            team: task.team,
            text,
            task: newTask._id
          })    

          res.status(200).json({
            status: true,
            message: "Task duplicated successfully"
          })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}