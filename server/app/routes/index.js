import express from 'express';
import multer from 'multer';

import createStudent from '../controllers/add.student';
import getStudents from '../controllers/get.students';
import getStudent from '../controllers/get.student';
import updateStudent from '../controllers/update.student';
import deleteStudent from '../controllers/delete.student';


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/images');
    },
    filename(req, file, cb) {
        const filename = file.originalname;
        const arr = filename.split('.');
        const fileExt = arr[arr.length - 1];
        if (fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'png' && fileExt !== 'gif') {
            cb('only jpeg, jpg, png or gif files allowed');
        } else {
            cb(null, `${Date.now().toString()}.${arr[arr.length - 1]}`);
        }
    }
});

const upload = multer({ storage });


const router = express.Router();

router.get(
    '/',
    (req, res) => {
        res.status(200).json({ message: 'Student Service' });
    }
);


router.post(
    '/students',
    upload.single('file'), (req, res, next) => {
        try {
            if (!req.file) {
                logger.error('Could not upload image');
                res.status(400).json({
                    message: 'Could not Upload Image'
                });
                return;
            }
            const { file } = req;
            const meta = req.body;
            req.body.photo_url = req.file.filename;
            logger.info('Image Uploaded! Available Here:', req.file.filename);
            next();
        } catch (e) {
            res.status(400).json({
                error: e
            });
        }
    },
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
