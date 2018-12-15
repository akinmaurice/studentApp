import express from 'express';

import createStudent from '../controllers/add.student';
import getStudents from '../controllers/get.students';
import getStudent from '../controllers/get.student';
import updateStudent from '../controllers/update.student';
import deleteStudent from '../controllers/delete.student';

const router = express.Router();

router.get(
    '/',
    (req, res) => {
        res.status(200).json({ message: 'Student Service' });
    }
);


router.post(
    '/students',
    createStudent
);


router.get(
    '/students/',
    getStudents
);


router.get(
    '/students/page/:page',
    getStudents
);


router.get(
    '/students/:student_id',
    getStudent
);


router.put(
    '/students/:student_id',
    updateStudent
);


router.delete(
    '/students/:student_id',
    deleteStudent
);


export default router;