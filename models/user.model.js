import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User email is required"],
        trim: true,
        minLength: 5,
        maxLength: 255,
        lowecase: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        trim: true,
        minLength: 8,
        maxLength: 1024,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;