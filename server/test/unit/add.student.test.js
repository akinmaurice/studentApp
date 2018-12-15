import chai from 'chai';
import sinon from 'sinon';
import rewire from 'rewire';

import db from '../../config/database';


const createStudent = rewire('../../app/controllers/add.student.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to Create a Student', () => {
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
        const checkRequest = createStudent.__get__('checkRequest');
        await expect(checkRequest(request)).to.be.rejected;
    });


    it('Validation check should pass', async() => {
        const request = {
            first_name: 'Test',
            last_name: 'User',
            date_of_birth: '1991-06-29',
            email: 'akin@gmail.com',
            hobbies: 'Swimming, Football, Travelling'
        };
        const checkRequest = createStudent.__get__('checkRequest');
        const response = await checkRequest(request);
        response.should.equal(true);
    });


    it('Verification for email should fail', async() => {
        const email = 'akin@gmail.com';
        const student = {
            email: 'akin@gmail.com',
            first_name: 'Akin',
            last_name: 'Maurice'
        };
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(student));
        const verifyStudent = createStudent.__get__('verifyStudent');
        await expect(verifyStudent(email)).to.be.rejected;
    });


    it('Verification for email should pass', async() => {
        const email = 'akin@gmail.com';
        const student = null;
        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(student));
        const verifyStudent = createStudent.__get__('verifyStudent');
        const response = await verifyStudent(email);
        response.should.equal(true);
    });


    it('Creates a new Student', async() => {
        const request = {
            first_name: 'Test',
            last_name: 'User',
            date_of_birth: '1991-06-29',
            email: 'akin@gmail.com',
            hobbies: 'Swimming, Football, Travelling',
            photoUrl: 'https://s3.come/image/jsj.jpg'
        };
        const student = {
            id: 'student-3893b38387g468g4b',
            first_name: 'Test',
            last_name: 'User',
            date_of_birth: '1991-06-29',
            email: 'akin@gmail.com',
            hobbies: [ 'Swimming', 'Football', 'Travelling' ],
            photoUrl: 'https://s3.come/image/jsj.jpg',
            created_at: '2018-09-14 16:39:33.02',
            updated_at: '2018-09-14 16:39:33.02'
        };
        sandbox.stub(db, 'one').returns(Promise.resolve(student));
        const saveStudent = createStudent.__get__('saveStudent');
        const response = await saveStudent(request);
        response.should.equal(student);
    });
});
