import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

import db from '../../config/database';


const deleteStudent = rewire('../../app/controllers/delete.student.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to delete a student', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Should fail to get a student', async() => {
        const params = {
            student_id: 'student-12345'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        const getStudent = deleteStudent.__get__(' getStudent');
        await expect(getStudent(params.student_id)).to.be.rejected;
    });


    it('Should get a student', async() => {
        const params = {
            student_id: 'student-12345'
        };
        const student =
            {
                id: 'student-12345',
                first_name: 'Akin'
            };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(student));
        const getStudent = deleteStudent.__get__(' getStudent');
        const response = await getStudent(params.student_id);
        response.should.have.property('id');
        response.should.have.property('first_name');
    });

    it('Should remove a user from db', async() => {
        const params = {
            student_id: 'student-12345'
        };
        const student =
            {
                id: 'student-12345',
                first_name: 'Akin'
            };
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const removeStudentFromDB = deleteStudent.__get__('removeStudentFromDB');
        const response = await removeStudentFromDB(params);
        response.should.equal('student removed');
    });
});
