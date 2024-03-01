import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // minLength: [3, "Please provide a valid name"],
        trim: true,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        // minLength: [11, "Please provide a valid email id"],
        trim: true,
        unique: true,
        required: [true, "Email is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        // minLength: [8, "Weak Password"],
        trim: true,
        required: [true, "Password is Required"],
        // select: false
    },
});

export const User = mongoose.model('User', userSchema);