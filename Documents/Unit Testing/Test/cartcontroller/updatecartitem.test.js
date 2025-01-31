import { expect } from 'chai';
import sinon from 'sinon';
import { updateCartItem } from '../../controller/cart-controller.js';
import User from '../../model/user-schema.js';

describe('updateCartItem Controller', () => {
    let mockRequest, mockResponse, findOneStub;

    beforeEach(() => {
        // Mock the request and response objects
        mockRequest = {
            body: {
                username: 'testUser',
                id: '12345',
                quantity: 2
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

    it('should return 400 if required fields are missing', async () => {
        mockRequest.body = {}; // Simulate missing fields

        await updateCartItem(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'Username, Product ID, and quantity are required.'
            })
        ).to.be.true;
    });

    it('should return 404 if the user is not found', async () => {
        findOneStub.returns(null); // Simulate user not found

        await updateCartItem(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(404)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({ message: 'User not found.' })
        ).to.be.true;
    });

    it('should return 404 if the product is not in the user\'s cart', async () => {
        const mockUser = {
            cart: [
                { productId: '67890', quantity: 1 }
            ],
            save: sinon.spy() // Mock save method
        };

        findOneStub.returns(mockUser); // Simulate user with a different product in cart

        await updateCartItem(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(404)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({ message: 'Product not found in cart.' })
        ).to.be.true;
    });

    it('should update the product quantity if found in the cart', async () => {
        const mockUser = {
            cart: [
                { productId: '12345', quantity: 1 }
            ],
            save: sinon.spy() // Mock save method
        };

        findOneStub.returns(mockUser); // Simulate user with matching product in cart

        await updateCartItem(mockRequest, mockResponse);

        expect(mockUser.cart[0].quantity).to.equal(2); // Ensure quantity was updated
        expect(mockUser.save.calledOnce).to.be.true; // Ensure save was called
        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'Cart updated successfully.',
                cart: mockUser.cart
            })
        ).to.be.true;
    });

    it('should return 500 if there is an internal server error', async () => {
        findOneStub.throws(new Error('Database error')); // Simulate a database error

        await updateCartItem(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'Internal Server Error',
                error: 'Database error'
            })
        ).to.be.true;
    });



    it('should handle case when user cart is empty', async () => {
        const mockUser = {
            cart: [],
            save: sinon.spy()
        };

        findOneStub.returns(mockUser); // Simulate user with empty cart

        await updateCartItem(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(404)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                message: 'Product not found in cart.'
            })
        ).to.be.true;
    });

  
});
