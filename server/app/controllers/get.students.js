import Q from 'q';
import query from '../queries';
import db from '../../config/database';
import config from '../../config';


const getStudentsFromDb = async(params) => {
    const defer = Q.defer();
    try {
        const limit = config.paginationLimit;
        const { page } = params;
        const pageNumber = parseFloat(page) || 1;
        const offset = ((pageNumber - 1) * limit);
        const promise = Q.all([
            db.any(query.getAllStudents, [ offset, limit ]),
            db.oneOrNone(query.getStudentsCount)
        ]);
        const result = await promise;
        const students = result[0];
        const studentsCount = result[1].count;
        const itemCount = parseFloat(studentsCount);
        const pageCount = Math.ceil(itemCount / limit);
        defer.resolve({
            students,
            current_page: pageNumber,
            page_count: pageCount,
            item_count: itemCount
        });
    } catch (e) {
        logger.error('Get-All-Students-Error', e, {
            serviceName: config.serviceName
        });
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function getStudents(req, res) {
    try {
        const { params } = req;
        const students_data = await getStudentsFromDb(params);
        res.status(200).json({
            students_data
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


export default getStudents;
