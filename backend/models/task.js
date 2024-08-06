import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

taskSchema.plugin(mongooseAggregatePaginate);

const Task = mongoose.model("task", taskSchema);

export default Task;