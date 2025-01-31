import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { addToCart } from '../../controller/cart-controller.js';  // Update the path as needed
import User from '../../model/user-schema.js';  // Update the path as needed
import Product from '../../model/product-schema.js';  // Update the path as needed

describe('addToCart Controller', () => {
    let userStub, productStub, saveStub;

    beforeEach(() => {
        // Stub User.findOne method to simulate user fetching
        userStub = sinon.stub(User, 'findOne');
        
        // Stub Product.findById method to simulate product fetching
        productStub = sinon.stub(Product, 'findById');

        // Stub the save method for the user model to simulate saving the cart data
        saveStub = sinon.stub();
    });

    afterEach(() => {
        // Restore the original methods
        sinon.restore();
    });

    it('should return 400 if username or product ID is missing', async () => {
        const req = { body: { username: '', id: '' } };
        const res = { 
            status: sinon.stub().returnsThis(), 
            json: sinon.stub() 
        };

        await addToCart(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Username and Product ID are required.' })).to.be.true;
    });

    it('should return 404 if user is not found', async () => {
        const req = { body: { username: 'nonexistentuser', id: 'someproductid' } };
        const res = { 
            status: sinon.stub().returnsThis(), 
            json: sinon.stub() 
        };

        userStub.returns(Promise.resolve(null));  // Simulate user not found

        await addToCart(req, res);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'User not found.' })).to.be.true;
    });

    it('should return 404 if product is not found', async () => {
        const req = { body: { username: 'testuser', id: 'someproductid' } };
        const res = { 
            status: sinon.stub().returnsThis(), 
            json: sinon.stub() 
        };

        userStub.returns(Promise.resolve({
            cart: []
        }));  // Simulate user found
        productStub.returns(Promise.resolve(null));  // Simulate product not found

        await addToCart(req, res);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'Product not found.' })).to.be.true;
    });

    it('should add a product to the cart if not already present', async () => {
        const req = { body: { username: 'testuser', id: 'someproductid', quantity: 2 } };
        const res = { 
            status: sinon.stub().returnsThis(), 
            json: sinon.stub() 
        };

        const mockUser = {
            cart: [],
            save: saveStub
        };

        userStub.returns(Promise.resolve(mockUser));  // Simulate user found
        productStub.returns(Promise.resolve({ _id: 'someproductid', name: 'Test Product' }));  // Simulate product found

        await addToCart(req, res);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ message: 'Product added to cart successfully.', cart: [{ productId: 'someproductid', quantity: 2 }] })).to.be.true;
    });

    it('should return 500 if there is an internal server error', async () => {
        const req = { body: { username: 'testuser', id: 'someproductid' } };
        const res = { 
            status: sinon.stub().returnsThis(), 
            json: sinon.stub() 
        };

        userStub.throws(new Error('Database error'));  // Simulate a database error

        await addToCart(req, res);
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Internal Server Error', error: 'Database error' })).to.be.true;
    });
});
