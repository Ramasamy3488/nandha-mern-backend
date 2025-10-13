const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the Student Name"]
    },
    email: {
        type: String,
        required: [true, "Please enter the Student Email"],
        unique: [true, "Email must be unique"],
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    age: {
        type: Number,
        required: [true, "Please enter the Student Age"],
        min: [18, "Age must be 18 or above"],
        max: [60, "Age must be  60 or below 60"]
    },
    city: {
        type: String,
        required: [true, "Please enter the Student City"]
    }
});

const studentCollection = mongoose.model("student", studentSchema);

module.exports = studentCollection;