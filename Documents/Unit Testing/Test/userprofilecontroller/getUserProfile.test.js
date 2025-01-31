import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { getUserProfile } from '../../controller/user-profile-controller.js';
import User from '../../model/user-schema.js';

describe('getUserProfile Controller', () => {
    let mockRequest, mockResponse, findOneStub;

    beforeEach(() => {
        // Mock the request and response objects
        mockRequest = {
            query: {
                username: 'testuser'  // The username you're testing
            }
        };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()  // Chainable stub for status
        };

        // Stub the User.findOne() method
        findOneStub = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        // Restore all stubs after each test
        findOneStub.restore();
    });

    it('should return user profile details when user is found', async () => {
        const mockUser = {
            firstname: 'John',
            lastname: 'Doe',
            username: 'testuser',
            email: 'testuser@example.com',
            phone: '1234567890',
            cart: [
                { productId: 'productId1', quantity: 2 },
                { productId: 'productId2', quantity: 1 }
            ]
        };

        // Mock the response of User.findOne() to return a user object
        findOneStub.returns(mockUser);

        // Call the controller function
        await getUserProfile(mockRequest, mockResponse);

        // Check if the response was called with the correct user profile details
        expect(mockResponse.json.calledOnceWithExactly({
            firstname: mockUser.firstname,
            lastname: mockUser.lastname,
            username: mockUser.username,
            email: mockUser.email,
            phone: mockUser.phone,
            cart: mockUser.cart
        })).to.be.true;

        expect(mockResponse.status.called).to.be.false;  // status should not have been called on success
    });

    it('should return 404 if user is not found', async () => {
        // Mock User.findOne() to return null (no user found)
        findOneStub.returns(null);

        // Call the controller function
        await getUserProfile(mockRequest, mockResponse);

        // Check if status 404 was returned with 'User not found' message
        expect(mockResponse.status.calledOnceWithExactly(404)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'User not found' })).to.be.true;
    });

    it('should return 400 if no username query parameter is provided', async () => {
        // Remove username query parameter from the mockRequest
        mockRequest.query.username = undefined;

        // Call the controller function
        await getUserProfile(mockRequest, mockResponse);

        // Check if status 400 was returned with 'Username query parameter is required' message
        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Username query parameter is required' })).to.be.true;
    });

    it('should return 500 if there is a database or server error', async () => {
        // Simulate a database error by throwing an error in the findOne method
        findOneStub.throws(new Error('Database error'));

        // Call the controller function
        await getUserProfile(mockRequest, mockResponse);

        // Check if status 500 was returned with 'Server error' message
        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Server error' })).to.be.true;
    });
});
