import { expect } from 'chai';
import sinon from 'sinon';
import { clearCart } from '../../controller/cart-controller.js';
import User from '../../model/user-schema.js';

describe('clearCart Controller', () => {
    let mockRequest, mockResponse, findOneStub;

    beforeEach(() => {
        // Mock request and response objects
        mockRequest = {
            body: {
                username: 'testuser'
            }
        };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        // Stub the User.findOne method
        findOneStub = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        // Restore stubs after each test
        findOneStub.restore();
    });

    it('should return 400 if the username is missing', async () => {
        mockRequest.body = {}; // No username provided

        await clearCart(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'Username is required.'
            })
        ).to.be.true;
    });

    it('should return 404 if the user is not found', async () => {
        findOneStub.returns(null); // Simulate no user found

        await clearCart(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(404)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'User not found.'
            })
        ).to.be.true;
    });

    it('should clear the user\'s cart if the user is found', async () => {
        const mockUser = {
            cart: [
                { productId: '12345', quantity: 1 },
                { productId: '67890', quantity: 3 }
            ],
            save: sinon.spy() // Mock save method
        };

        findOneStub.returns(mockUser); // Simulate user with a cart

        await clearCart(mockRequest, mockResponse);

        expect(mockUser.cart).to.be.empty; // Cart should be cleared
        expect(mockUser.save.calledOnce).to.be.true; // Ensure save was called
        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'Cart cleared successfully.'
            })
        ).to.be.true;
    });

    it('should return 500 if there is an internal server error', async () => {
        findOneStub.throws(new Error('Database error')); // Simulate an error

        await clearCart(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'Internal Server Error',
                error: 'Database error'
            })
        ).to.be.true;
    });
});
