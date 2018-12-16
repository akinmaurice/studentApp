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
            'date_of_birth',
            'hobbies'
        ]);
        if (error) {
            logger.warn('Validate-Student-Error', error, {
                serviceName: config.serviceName
            });
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


const getStudent = async(student_id) => {
    const defer = Q.defer();
    try {
        const student = await db.oneOrNone(query.getStudentById, [ student_id ]);
        if (!student) {
            defer.reject('No student with that id');
        }
        defer.resolve(student);
    } catch (e) {
        logger.error('Get-Student-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const updateStudentData = async(body, student_id) => {
    const defer = Q.defer();
    try {
        const {
            first_name, last_name,
            date_of_birth
        } = body;
        let { hobbies } = body;
        hobbies = hobbies.toString();
        hobbies = hobbies.split(',');
        await db.none(
            query.updateStudent,
            [
                first_name,
                last_name,
                date_of_birth,
                JSON.stringify(hobbies),
                moment(),
                student_id
            ]
        );
        defer.resolve(true);
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


async function updateStudent(req, res) {
    try {
        const { body, params } = req;
        const { student_id } = params;
        await checkRequest(body);
        await getStudent(student_id);
        await updateStudentData(body, student_id);
        const student = await(getStudent(student_id));
        res.status(200).json({
            student
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default updateStudent;
