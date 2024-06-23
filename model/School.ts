import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    type: {
        type: String,
        enum: ["private", "government", "church"],
        required: [true, "Please specify a type"],
    },
    address: {
        type: String,
        required: [true, "Please provide an address"],
    },
    location: {
        type: String,
        required: [true, "Please provide a location"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
    },
    adminEmail: {
        type: String,
        required: [true, "Please provide an admin email"],
    },
});

export default mongoose.models.School || mongoose.model("School", SchoolSchema);