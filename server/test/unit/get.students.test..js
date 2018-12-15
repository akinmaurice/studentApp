import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

import db from '../../config/database';
import config from '../../config';


const getStudents = rewire('../../app/controllers/get.students.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to get all students', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Should get all students', async() => {
        const params = {
            page: 1
        };
        const students = [
            {
                id: 'student-12345',
                first_name: 'Akin'
            }
        ];
        const countResponse = {
            count: 1
        };
        sandbox.stub(db, 'any').returns(Promise.resolve(students));
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(countResponse));
        const getStudentsFromDb = getStudents.__get__('getStudentsFromDb');
        const response = await getStudentsFromDb(params);
        response.should.have.property('students');
        response.should.have.property('current_page');
        response.should.have.property('page_count');
        response.should.have.property('item_count');
    });
});
