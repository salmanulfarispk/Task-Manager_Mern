import Task from "../models/task.js"
import Notification from "../models/notification.js"
import User from "../models/User.js";



export const createTask = async (req, res) => {
    try {

        const { userId } = req.user;

        const { title, priority, date, stage, team, assets } = req.body;

        let text = "New task has been assigned to you";
        if (team?.length > 1) {
            text = text + ` and ${team?.length - 1} others.`
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
            stage: stage.toLowerCase(),   //like progress,todo,complted... etcc
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


export const PostActivityTask = async (req, res) => {
    try {

        const { id } = req.params;
        const { userId } = req.user;
        const { type, activity } = req.body;

        const task = await Task.findById(id)

        const datas = {
            type,
            activity,
            by: userId
        };

        task.activities.push(datas)

        await task.save();

        res.status(200).json({
            status: true,
            message: "Activity posted succesfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }

}



export const DashboardStatics = async (req, res) => {
    try {

        const { userId, isAdmin } = req.user;

        const allTasks = isAdmin ?  //true
            await Task.find({
                isTrashed: false
            }).populate({
                path: "team",
                select: "name role title email"
            }).sort({ _id: -1 })      //most recently created tasks will be listed first.

            :      //false,means other user

            await Task.find({
                isTrashed: false,
                team: { $all: [userId] } //Ensure logged-in user is part of the team. others
            }).populate({
                path: "team",
                select: "name role title email",
            }).sort({ _id: -1 })


        const users = await User.find({ isActive: true })
            .select("name title role isAdmin createdAt")
            .limit(10)
            .sort({ _id: -1 })

        //group task by stage and calculate counts

        const groupTasks = allTasks.reduce((result, task) => {

            const stage = task.stage;

            if (!result[stage]) {       //if result object has not have the  same stage value,then it added to result object and set as 1
                result[stage] = 1;
            } else {
                result[stage] += 1;     //if result object has the same stage value then increment with +1
            }

            return result;
        }, {})                         // Initialize the result object as an empty object



        //Group task by priority

        const groupedData = Object.entries(     //return result object into array
            allTasks.reduce((result, task) => {
                const { priority } = task;

                result[priority] = (result[priority] || 0) + 1;    //if result has already has a value ,then increment  one to that value,if no value then defalt as 0,then icrement with one
                return result;
            }, {})
        ).map(([name, total])=> ({name, total }))

          

        //calculate total taks
        const totalTasks = allTasks?.length;
        const last10Tasks = allTasks.slice(0, 10);

        const summary = {
            totalTasks,
            last10Tasks,
            users: isAdmin ? users : [],    //only admin can see the last 10 active list of users, 
            tasks: groupTasks,
            graphdata: groupedData
        }

        res.status(200).json({
            status: true,
            message: " Got all dashboard statics Successfully",
            ...summary,
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const getTaskss = async (req, res) => {
    try {

        const { stage, isTrashed } = req.query;

        let query = { isTrashed: isTrashed ? true : false };

        if (stage) {
            query.stage = stage;
        }

        let queryResult = await Task.find(query)
            .populate({
                path: "team",
                select: "name title email"
            })
            .sort({ _id: -1 });

        const tasks = await queryResult;


        res.status(200).json({
            status: true,
            tasks,
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const getTask = async (req, res) => {
    try {

        const { id } = req.params;

        const task = await Task.findById(id)
            .populate({
                path: "team",
                select: "name title role email"
            })
            .populate({
                path: "activities.by",
                select: "name"
            })

        res.status(200).json({
            status: true,
            task,
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const CreateSubTask = async (req, res) => {
    try {

        const { title, date, tag } = req.body;
        const { id } = req.params;

        const newSubTask = {
            title,
            date,
            tag,
        };

        const task = await Task.findById(id)

        task.subTasks.push(newSubTask)

        await task.save();

        res.status(200).json({
            status: true,
            message: "SubTask added successfully."
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const UpdateTask = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, priority, date, stage, team, assets } = req.body;

        const updatetask = await Task.findByIdAndUpdate(id, {
            title,
            priority: priority.toLowerCase(),
            date,
            stage: stage.toLowerCase(),
            team,
            assets
        },
            { new: true }
        );


        if (!updatetask) {
            return res.status(404).json({ status: false, message: "Task not found" });
        }

        res.status(200).json({
            status: true,
            message: "Task duplicated successfully."
        });


    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const trashTask = async (req, res) => {
    try {

        const { id } = req.params;

        const task = await Task.findByIdAndUpdate(id, {
            isTrashed: true
        },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ status: false, message: "Task not found" });
        }

        res.status(200).json({
            status: true,
            message: `Task trashed successfully.`,
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}

export const deleteRestore = async (req, res) => {
    try {
        const { id } = req.params;

        const { actionType } = req.query;

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id)
        } else if (actionType === "deleteAll") {
            await Task.deleteMany({ isTrashed: true })
        }
        else if (actionType === "restore") {
            const resp = await Task.findById(id);

            resp.isTrashed = false;
            resp.save();
        }

        else if (actionType === "restoreAll") {
            await Task.updateMany({ isTrashed: true }, { $set: { isTrashed: false } });
        }


        res.status(200).json({
            status: true,
            message: `All Operation performed successfully.`,
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: false, message: error.message });
    }
}