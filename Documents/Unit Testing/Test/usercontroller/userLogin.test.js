import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userLogin } from '../../controller/user-controller.js';
import User from '../../model/user-schema.js';

describe('userLogin Controller', () => {
    let mockRequest, mockResponse, findOneStub, bcryptStub, jwtStub;

    beforeEach(() => {
        // Mock request and response objects
        mockRequest = {
            body: {
                username: 'testUser',
                password: 'testPassword'
            }
        };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        // Stubs for User methods and bcrypt
        findOneStub = sinon.stub(User, 'findOne');
        bcryptStub = sinon.stub(bcrypt, 'compare');
        jwtStub = sinon.stub(jwt, 'sign').returns('mockedToken');
    });

    afterEach(() => {
        // Restore all stubs
        findOneStub.restore();
        bcryptStub.restore();
        jwtStub.restore();
    });

    it('should return 400 if the username or password is empty', async () => {
        mockRequest.body = {}; // Simulate empty body

        await userLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Username and password are required.' })).to.be.true;
    });

    it('should return 400 if the username is missing', async () => {
        mockRequest.body = { password: 'password123' }; // Simulate missing username

        await userLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Username and password are required.' })).to.be.true;
    });

    it('should return 400 if the password is missing', async () => {
        mockRequest.body = { username: 'testUser' }; // Simulate missing password

        await userLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Username and password are required.' })).to.be.true;
    });

    it('should return 401 if the username does not exist', async () => {
        findOneStub.returns(null); // Simulate user not found

        await userLogin(mockRequest, mockResponse);

        expect(findOneStub.calledOnceWithExactly({ username: 'testUser' })).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(401)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly('Invalid Login')).to.be.true;
    });

    it('should return 401 if the password is incorrect', async () => {
        findOneStub.returns({ username: 'testUser', password: 'hashedPassword' }); // Simulate user found
        bcryptStub.resolves(false); // Simulate password mismatch

        await userLogin(mockRequest, mockResponse);

        expect(bcryptStub.calledOnceWithExactly('testPassword', 'hashedPassword')).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(401)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly('Invalid Login')).to.be.true;
    });

    it('should return 200 and a token if login is successful', async () => {
        const mockUser = { _id: '12345', username: 'testUser', password: 'hashedPassword' };
        findOneStub.returns(mockUser); // Simulate user found
        bcryptStub.resolves(true); // Simulate password match

        await userLogin(mockRequest, mockResponse);

        expect(bcryptStub.calledOnceWithExactly('testPassword', 'hashedPassword')).to.be.true;
        expect(jwtStub.calledOnceWithExactly(
            sinon.match({ _id: '12345', username: 'testUser', role: 'Buyer' }),
            sinon.match.any,
            sinon.match.any
        )).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            user: mockUser,
            token: 'mockedToken'
        })).to.be.true;
    });

    it('should return 500 if an error occurs during login', async () => {
        findOneStub.throws(new Error('Database error')); // Simulate error

        await userLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly('Error', 'Database error')).to.be.true;
    });
});
