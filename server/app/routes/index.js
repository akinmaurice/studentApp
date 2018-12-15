import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';

import createStudent from '../controllers/add.student';
import getStudents from '../controllers/get.students';
import getStudent from '../controllers/get.student';
import updateStudent from '../controllers/update.student';
import deleteStudent from '../controllers/delete.student';

import config from '../../config';


const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION
});

const s3 = new AWS.S3();


const storage = multerS3({
    s3,
    bucket: config.AWS_BUCKET,
    acl: 'public-read',
    metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
        const filename = file.originalname;
        const arr = filename.split('.');
        cb(null, `${Date.now().toString()}.${arr[arr.length - 1]}`);
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
        if (!req.file) {
            logger.error('Could not upload image');
            res.status(400).json({
                message: 'Could not Upload Image'
            });
            return;
        }
        const { file } = req;
        const meta = req.body;
        req.body.photo_url = file.location;
        logger.info('Image Uploaded! Available Here:', file.location);
        next();
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
