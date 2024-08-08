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
    avatar: {
        type: String,
        default: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
    },
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
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    }],
}, {
    timestamps: true,
});

const User = mongoose.models["user"] || mongoose.model("user", userSchema);
export default User;