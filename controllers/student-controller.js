const studentsModel = require('../models/student-model');

async function readAllStudents(req, res) {
    try {
        const students = await studentsModel.find({});
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function readAStudent(req, res) {
    try {
        const { name, email } = req.body;
        if (!name && !email) {
            return res.status(400).json({ error: "Please provide name or email" });
        }

        const search = new RegExp(name || email, 'i');

        const students = await studentsModel.find({
            $or: [{ name: search }, { email: search }]
        });

        return res.json(students); // empty array if no match
    } catch (err) {
        console.error("readAStudent error:", err);
        return res.status(500).json({ error: err.message });
    }
}



async function addAStudent(req, res) {
    try {
        const studentExist = await studentsModel.find({ email: req.body.email });
        if (studentExist.length > 0) {
            return res.status(400).json({ message: "Student Already Exists!" });
        }

        const student = new studentsModel(req.body);
        await student.save();

        res.status(201).json({ message: "Student Added Successfully!" });

    } catch (err) {
        const errorList = [];
        if (err.errors) {
            for (let temp in err.errors) {
                errorList.push(err.errors[temp].message);
            }
        }
        res.status(400).json({ errors: errorList.length ? errorList : err.message });
    }
}

async function updateAStudent(req, res) {
    try {
        const results = await studentsModel.updateOne({ email: req.body.email }, { $set: req.body });
        if (results.modifiedCount > 0) {
            res.status(200).json({ message: "Student Updated Successfully!" });
        } else {
            res.status(404).json({ message: "Unable to update the Student!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAStudent(req, res) {
    try {
        const results = await studentsModel.deleteOne({ email: req.body.email });
        if (results.deletedCount > 0) {
            res.status(200).json({ message: "Student deleted Successfully!" });
        } else {
            res.status(404).json({ message: "Unable to delete the Student!" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    readAllStudents,
    readAStudent,
    addAStudent,
    updateAStudent,
    deleteAStudent
};

