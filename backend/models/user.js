import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        default: "User",
    },
    // TODO: Add an avatar field to the user schema
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    // TODO: Add token and token expiration fields to the user schema
    token: {
        type: String,
        default: "",
    },
    tokenExpiration: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true,
});

const User = mongoose.models["user"] || mongoose.model("user", userSchema);
export default User;