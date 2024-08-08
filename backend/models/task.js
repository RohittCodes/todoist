import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const dateSchema = new mongoose.Schema({
    calendar: {
        identifier: {
            type: String,
            required: true,
            default: "gregory"
        }
    },
    era: {
        type: String,
        required: true,
        default: "AD"
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    }
}, { _id: false });

const timeSchema = new mongoose.Schema({
    calendar: {
        identifier: {
            type: String,
            required: true,
            default: "gregory"
        }
    },
    era: {
        type: String,
        required: true,
        default: "AD"
    },
    hour: {
        type: Number,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    offset: {
        type: Number,
        required: true
    },
    second: {
        type: Number,
        required: true
    }
}, { _id: false });

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["personal", "work", "school", "others"],
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "progress", "completed"],
        default: "pending"
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
        default: 10
    },
    startDate: {
        type: dateSchema,
        required: true
    },
    dueDate: {
        type: dateSchema,
        required: true
    },
    startTime: {
        type: timeSchema,
        required: true
    },
    endTime: {
        type: timeSchema,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

taskSchema.plugin(mongooseAggregatePaginate);

const Task = mongoose.model("Task", taskSchema);

export default Task;