import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

import db from '../../config/database';


const updateStudent = rewire('../../app/controllers/update.student.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to edit a student', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Validation check should fail', async() => {
        const request = {
            id: 'user-12345',
            first_name: 'Test',
            last_name: 'User'
        };
        const checkRequest = updateStudent.__get__('checkRequest');
        await expect(checkRequest(request)).to.be.rejected;
    });


    it('Validation check should pass', async() => {
        const request = {
            first_name: 'Test',
            last_name: 'User',
            date_of_birth: '1991-06-29',
            hobbies: [ 'Swimming', 'Football', 'Travelling' ]
        };
        const checkRequest = updateStudent.__get__('checkRequest');
        const response = await checkRequest(request);
        response.should.equal(true);
    });


    it('Should fail to get a student', async() => {
        const params = {
            student_id: 'student-12345'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve());
        const getStudent = updateStudent.__get__(' getStudent');
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
        const getStudent = updateStudent.__get__(' getStudent');
        const response = await getStudent(params.student_id);
        response.should.have.property('id');
        response.should.have.property('first_name');
    });

    it('Should update a student', async() => {
        const params = {
            student_id: 'student-12345'
        };
        const request = {
            first_name: 'Test',
            last_name: 'User',
            date_of_birth: '1991-06-29',
            hobbies: [ 'Swimming', 'Football', 'Travelling' ]
        };
        sandbox.stub(db, 'none').returns(Promise.resolve());
        const updateStudentData = updateStudent.__get__('updateStudentData');
        const response = await updateStudentData(request, params.student_id);
        response.should.equal(true);
    });
});
