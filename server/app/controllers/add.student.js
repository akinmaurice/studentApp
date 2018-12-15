import moment from 'moment';
import Q from 'q';
import checkRequestBody from '../utils/request.body.verifier';
import query from '../queries';
import db from '../../config/database';
import config from '../../config';


const checkRequest = (body) => {
    const defer = Q.defer();
    try {
        const error = checkRequestBody(body, [
            'first_name',
            'last_name',
            'email',
            'date_of_birth',
            'hobbies'
        ]);
        if (error) {
            defer.reject({
                code: 400,
                msg: error
            });
        }
        const { date_of_birth } = body;
        if (moment(date_of_birth).isValid()) {
            defer.resolve(true);
        }
        defer.reject({
            code: 400,
            msg: 'Please provide a valid date of birth in this format YYYY-MM-DD'
        });
    } catch (e) {
        defer.reject({
            code: 400,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const verifyStudent = async(email) => {
    const defer = Q.defer();
    try {
        const student = await db.oneOrNone(query.getStudentByEmail, [ email ]);
        if (student) {
            defer.reject({
                code: 409,
                msg: 'A student with that email exists'
            });
        }
        defer.resolve(true);
    } catch (e) {
        logger.error('Verify-Student-Email-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const saveStudent = async(body) => {
    const defer = Q.defer();
    try {
        const {
            first_name, last_name, email,
            date_of_birth, photo_url,
            hobbies
        } = body;
        const student = await db.one(
            query.createStudent,
            [
                first_name,
                last_name,
                email,
                date_of_birth,
                JSON.stringify(hobbies),
                photo_url,
                moment(),
                moment()
            ]
        );
        defer.resolve(student);
    } catch (e) {
        logger.error('Add-Student-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const getStudent = async(studentId) => {
    const defer = Q.defer();
    try {
        const student = await db.oneOrNone(query.getStudentById, [ studentId ]);
        if (!student) {
            defer.reject({
                code: 400,
                msg: 'No student with that id'
            });
        }
        defer.resolve(student);
    } catch (e) {
        logger.error('Get-Added-Student-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function createStudent(req, res) {
    try {
        const { body } = req;
        const { email } = body;
        await checkRequest(body);
        await verifyStudent(email);
        const newStudent = await saveStudent(body);
        const { id } = newStudent;
        const student = await(getStudent(id));
        res.status(201).json({
            student
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default createStudent;
