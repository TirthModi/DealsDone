import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sellerLogin } from '../../controller/seller-controller.js';
import Seller from '../../model/seller-schema.js';

describe('sellerLogin Controller', () => {
    let mockRequest, mockResponse, findOneStub, bcryptStub, jwtStub;

    beforeEach(() => {
        // Mock request and response objects
        mockRequest = {
            body: {
                username: 'testuser',
                password: 'testPassword'
            }
        };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        // Stubs for User methods and bcrypt
        findOneStub = sinon.stub(Seller, 'findOne');
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

        await sellerLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Username and password are required.' })).to.be.true;
    });

    it('should return 400 if the username is missing', async () => {
        mockRequest.body = { password: 'password123' }; // Simulate missing username

        await sellerLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Username and password are required.' })).to.be.true;
    });

    it('should return 400 if the password is missing', async () => {
        mockRequest.body = { username: 'testuser' }; // Simulate missing password

        await sellerLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Username and password are required.' })).to.be.true;
    });

    it('should return 401 if the username does not exist', async () => {
        findOneStub.returns(null); // Simulate user not found

        await sellerLogin(mockRequest, mockResponse);

        expect(findOneStub.calledOnceWithExactly({ username: 'testuser' })).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(401)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly('Invalid Login')).to.be.true;
    });

    it('should return 401 if the password is incorrect', async () => {
        findOneStub.returns({ username: 'testuser', password: 'hashedPassword' }); // Simulate user found
        bcryptStub.resolves(false); // Simulate password mismatch

        await sellerLogin(mockRequest, mockResponse);

        expect(bcryptStub.calledOnceWithExactly('testPassword', 'hashedPassword')).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(401)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly('Invalid Login')).to.be.true;
    });

    it('should return 200 and a token if login is successful', async () => {
        const mockUser = { _id: '12345', username: 'testuser', password: 'hashedPassword' };
        findOneStub.returns(mockUser); // Simulate user found
        bcryptStub.resolves(true); // Simulate password match

        await sellerLogin(mockRequest, mockResponse);

        expect(bcryptStub.calledOnceWithExactly('testPassword', 'hashedPassword')).to.be.true;
        expect(jwtStub.calledOnceWithExactly(
            sinon.match({ _id: '12345', username: 'testuser', role: 'Seller' }),
            sinon.match.any,
            sinon.match.any
        )).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            seller: mockUser,
            token: 'mockedToken'
        })).to.be.true;
    });

    it('should return 500 if an error occurs during login', async () => {
        findOneStub.throws(new Error('Database error')); // Simulate error

        await sellerLogin(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly('Error', 'Database error')).to.be.true;
    });
});
