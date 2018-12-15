import Q from 'q';
import query from '../queries';
import db from '../../config/database';
import config from '../../config';


const getStudentById = async(params) => {
    const defer = Q.defer();
    try {
        const {
            student_id
        } = params;
        const student = await db.oneOrNone(
            query.getStudentById,
            [
                student_id
            ]
        );
        if (!student) {
            defer.reject({
                code: 404,
                msg: 'Could not find that student'
            });
        }
        defer.resolve(student);
    } catch (e) {
        logger.error('Get-Student-By-ID-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function getStudent(req, res) {
    try {
        const { params } = req;
        const student = await getStudentById(params);
        res.status(200).json({
            student
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default getStudent;
