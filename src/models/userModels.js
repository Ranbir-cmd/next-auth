import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
}, {timestamps: true});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;