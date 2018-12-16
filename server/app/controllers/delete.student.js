import Q from 'q';
import query from '../queries';
import db from '../../config/database';
import config from '../../config';


const getStudent = async(student_id) => {
    const defer = Q.defer();
    try {
        const student = await db.oneOrNone(query.getStudentById, [ student_id ]);
        if (!student) {
            defer.reject({
                code: 400,
                msg: 'Could not find that student'
            });
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


const removeStudentFromDB = async(student_id) => {
    console.log(student_id);
    const defer = Q.defer();
    try {
        await db.none(
            query.deleteStudent,
            [
                student_id
            ]
        );
        defer.resolve('student removed');
    } catch (e) {
        logger.error('Delete-Student-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function deleteStudent(req, res) {
    try {
        const { params } = req;
        const { student_id } = params;
        await getStudent(student_id);
        const student = await removeStudentFromDB(student_id);
        res.status(200).json({
            student
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default deleteStudent;
