import { expect } from 'chai';
import sinon from 'sinon';
import User from '../../../model/user-schema.js';
import { updateCartItem } from '../../../controller/cart-controller.js';

describe('updateCartItem Controller', () => {
    let req, res, userStub, saveStub;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        userStub = sinon.stub(User, 'findOne');
        saveStub = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 400 if username, product ID, or quantity is missing', async () => {
        req.body = { username: 'testUser', id: '12345' }; // Missing quantity

        await updateCartItem(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Username, Product ID, and quantity are required.' })).to.be.true;
    });

    it('should return 404 if user is not found', async () => {
        req.body = { username: 'nonexistentUser', id: '12345', quantity: 2 };

        userStub.resolves(null); // User not found

        await updateCartItem(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'User not found.' })).to.be.true;
    });

    it('should return 404 if product is not found in cart', async () => {
        req.body = { username: 'existingUser', id: '67890', quantity: 3 };

        const existingUser = {
            cart: [{ productId: '12345', quantity: 2 }], // Product not in cart
            save: saveStub,
        };

        userStub.resolves(existingUser);

        await updateCartItem(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'Product not found in cart.' })).to.be.true;
    });

    it('should update the product quantity in the cart if it exists', async () => {
        req.body = { username: 'existingUser', id: '12345', quantity: 5 };

        const existingUser = {
            cart: [{ productId: '12345', quantity: 2 }],
            save: saveStub,
        };

        userStub.resolves(existingUser);

        await updateCartItem(req, res);

        expect(existingUser.cart[0].quantity).to.equal(5); // Quantity updated
        expect(saveStub.calledOnce).to.be.true; // User saved
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Cart updated successfully.',
            cart: existingUser.cart,
        })).to.be.true;
    });

    it('should return 500 if there is a server error', async () => {
        req.body = { username: 'existingUser', id: '12345', quantity: 2 };

        userStub.rejects(new Error('Database error')); // Simulate a database error

        await updateCartItem(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({
            message: 'Internal Server Error',
            error: 'Database error',
        })).to.be.true;
    });
});
