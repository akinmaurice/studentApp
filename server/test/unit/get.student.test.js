import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

import db from '../../config/database';


const getStudent = rewire('../../app/controllers/get.student.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to get a single student', () => {
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
        const getStudentById = getStudent.__get__('getStudentById');
        await expect(getStudentById(params)).to.be.rejected;
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
        const getStudentById = getStudent.__get__('getStudentById');
        const response = await getStudentById(params);
        response.should.have.property('id');
        response.should.have.property('first_name');
    });
});
