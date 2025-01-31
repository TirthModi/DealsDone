import { expect } from 'chai';
import sinon from 'sinon';
import User from '../../../model/user-schema.js';
import Product from '../../../model/product-schema.js';
import { addToCart } from '../../../controller/cart-controller.js';

describe('addToCart Controller', () => {
    let req, res, userStub, productStub, saveStub;

    beforeEach(() => {
        req = { body: {} }; // Mock request object
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        }; // Mock response object
        userStub = sinon.stub(User, 'findOne'); // Stub User.findOne
        productStub = sinon.stub(Product, 'findById'); // Stub Product.findById
        saveStub = sinon.stub(); // Stub save method
    });

    afterEach(() => {
        sinon.restore(); // Restore original methods after each test
    });

    it('should return 400 if username or product ID is missing', async () => {
        req.body = { quantity: 2 }; // Missing username and product ID

        await addToCart(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Username and Product ID are required.' })).to.be.true;
    });

    it('should return 404 if user is not found', async () => {
        req.body = { username: 'nonexistentUser', id: '12345', quantity: 2 };
        userStub.resolves(null); // Simulate user not found

        await addToCart(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'User not found.' })).to.be.true;
    });

    it('should return 404 if product is not found', async () => {
        req.body = { username: 'existingUser', id: '12345', quantity: 2 };
        userStub.resolves({ cart: [] }); // User exists
        productStub.resolves(null); // Product not found

        await addToCart(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'Product not found.' })).to.be.true;
    });

    it('should update the quantity if the product is already in the cart', async () => {
        req.body = { username: 'existingUser', id: '12345', quantity: 2 };
        const user = {
            cart: [{ productId: '12345', quantity: 1 }],
            save: saveStub,
        };
        userStub.resolves(user); // User exists
        productStub.resolves({ id: '12345' }); // Product exists

        await addToCart(req, res);

        expect(user.cart[0].quantity).to.equal(3); // Quantity updated
        expect(saveStub.calledOnce).to.be.true; // User's save method called
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Product added to cart successfully.',
            cart: user.cart,
        })).to.be.true;
    });

    it('should add a new product to the cart if not already present', async () => {
        req.body = { username: 'existingUser', id: '12345', quantity: 2 };
        const user = {
            cart: [],
            save: saveStub,
        };
        userStub.resolves(user); // User exists
        productStub.resolves({ id: '12345' }); // Product exists

        await addToCart(req, res);

        expect(user.cart.length).to.equal(1); // One item added
        expect(user.cart[0]).to.deep.equal({ productId: '12345', quantity: 2 }); // Correct product and quantity
        expect(saveStub.calledOnce).to.be.true; // User's save method called
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Product added to cart successfully.',
            cart: user.cart,
        })).to.be.true;
    });

    it('should return 500 if there is a server error', async () => {
        req.body = { username: 'existingUser', id: '12345', quantity: 2 };
        userStub.rejects(new Error('Database error')); // Simulate database error

        await addToCart(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({
            message: 'Internal Server Error',
            error: 'Database error',
        })).to.be.true;
    });
});
