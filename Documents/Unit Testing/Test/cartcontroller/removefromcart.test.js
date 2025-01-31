import { expect } from 'chai';
import sinon from 'sinon';
import { removeFromCart } from '../../controller/cart-controller.js';
import User from '../../model/user-schema.js';

describe('removeFromCart Controller', () => {
    let mockRequest, mockResponse, findOneStub;

    beforeEach(() => {
        // Mock the request and response objects
        mockRequest = {
            body: {
                username: 'testuser',
                id: '12345'
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
        // Restore all stubs
        findOneStub.restore();
    });

    it('should return 400 if username or product ID is missing', async () => {
        mockRequest.body = {}; // Simulate missing fields

        await removeFromCart(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            message: 'Username and Product ID are required.'
        })).to.be.true;
    });

    it('should return 404 if user is not found', async () => {
        findOneStub.returns(null); // Simulate user not found

        await removeFromCart(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(404)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            message: 'User not found.'
        })).to.be.true;
    });

    it('should return 404 if product is not found in the cart', async () => {
        const mockUser = { cart: [{ productId: '67890', quantity: 1 }] };
        findOneStub.returns(mockUser); // Simulate user with a different product in cart

        await removeFromCart(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(404)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            message: 'Product not found in cart.'
        })).to.be.true;
    });

    it('should remove product from the cart successfully', async () => {
        const mockUser = {
            cart: [
                { productId: '12345', quantity: 1 },
                { productId: '67890', quantity: 2 }
            ],
            save: sinon.spy() // Mock save method
        };

        findOneStub.returns(mockUser); // Simulate user found with products in cart

        await removeFromCart(mockRequest, mockResponse);

        expect(mockUser.cart).to.have.lengthOf(1); // Check if the product was removed
        expect(mockUser.save.calledOnce).to.be.true; // Ensure save was called
        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            message: 'Product removed from cart.',
            cart: mockUser.cart
        })).to.be.true;
    });

    it('should return 500 if there is an internal server error', async () => {
        findOneStub.throws(new Error('Database error')); // Simulate a database error

        await removeFromCart(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            message: 'Internal Server Error',
            error: 'Database error'
        })).to.be.true;
    });
});
