const studentsModel = require('../models/student-model');


async function readAllStudents(req, res) {
    try {
        studentsModel.find({})
            .then(students => {
                res.json(students);
            })
    } catch (err) {
        res.json(err.message);
    }
}

async function readAStudent(req, res) {

    const {name, email} = req.body;
    try {
        studentsModel.find({"name": name, "email": email})
            .then(students => {
                (students.length > 0) 
                    ? 
                    res.json(students)
                    :
                    res.json("No Students found!!!");
               
            })
    } catch (err) {
        res.json(err.message);
    }
}


async function addAStudent(req, res) {

    const Student = new studentsModel(req.body);

    try {
        let studentExist = await studentsModel.find({"email": req.body.email})

        if (studentExist.length > 0) {
            return res.json({ message: "Student Already Exists!" });
        }

         await Student.save();

        res.json({ message: "Student Added Successfully!" });



    } catch (err) {
        let errorList = [];
        if(err.errors) {
            for(let temp in err.errors) {
                errorList.push(err.errors[temp].message)
            }
        }
        res.json(errorList);
    
    }
}

async function updateAStudent(req, res) {
    try {
        studentsModel.updateOne({"email": req.body.email}, {$set: req.body})
            .then(results => {
                (results.modifiedCount > 0)
                    ?
                    res.json("Student Updated Successfully!")
                    :
                    res.json("Unable to update the Student!");
            })
    } catch (err) {
        res.json(err.message);
    }
}

async function deleteAStudent(req, res) {
    try {
        studentsModel.deleteOne({"email": req.body.email})
            .then(results => {
                (results.deletedCount > 0)
                    ?
                    res.json("Student deleted Successfully!")
                    :
                    res.json("Unable to update the Student!");
            })
    } catch (err) {
        res.json(err.message);
    }
}




module.exports={
    readAllStudents,
    readAStudent,
    addAStudent,
    updateAStudent,
    deleteAStudent

}