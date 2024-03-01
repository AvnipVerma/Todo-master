import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    description: {
        type: String,
        //   required: true,
    },
    isCompleted: {
        type: Boolean,
    }
});

const schema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        // minLength: [3, "Please provide a valid name"],
        trim: true,
        // required: [true, "Name is required"],
    },
    priority: {
        type: String
    },
    dueDate: {
        type: String
    },
    checklist: [taskSchema],
    status: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Todo = mongoose.model('todo', schema);