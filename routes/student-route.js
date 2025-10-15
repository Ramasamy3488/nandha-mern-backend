const router = require('express').Router();

const studentController = require('../controllers/student-controller');

router.get('/readAllStudents', studentController.readAllStudents);
router.post('/readAStudent', studentController.readAStudent);
router.post('/addAStudent', studentController.addAStudent);
router.put('/updateAStudent', studentController.updateAStudent);
router.delete('/deleteAStudent', studentController.deleteAStudent);

module.exports = router;

