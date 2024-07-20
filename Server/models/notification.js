import mongoose, { Schema } from "mongoose";


const NotificationSchema= new Schema({

    team: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    text: {
        type: String,
        required: true,
    },
    task: {
           type: Schema.Types.ObjectId,
           ref:"Task"
        },
    notificType :{
        type: String,
        default: "alert",
        enum:["alert","message"]
    },
    isRead: [
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        },
    ],   
},
  {timestamps: true}
);

const Notification= mongoose.model("Notification", NotificationSchema)

export default Notification