import { expect } from 'chai';
import sinon from 'sinon';
import User from '../../../model/user-schema.js';
import { removeFromCart } from '../../../controller/cart-controller.js';

describe('removeFromCart Controller', () => {
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

    it('should return 400 if username or product ID is missing', async () => {
        req.body = { username: 'testUser' }; // Missing id

        await removeFromCart(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Username and Product ID are required.' })).to.be.true;
    });

    it('should return 404 if user is not found', async () => {
        req.body = { username: 'nonexistentUser', id: '12345' };

        userStub.resolves(null); // User not found

        await removeFromCart(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'User not found.' })).to.be.true;
    });

    it('should remove the product from the cart if it exists', async () => {
        req.body = { username: 'existingUser', id: '12345' };

        const existingUser = {
            cart: [{ productId: '12345', quantity: 2 }, { productId: '67890', quantity: 1 }],
            save: saveStub,
        };

        userStub.resolves(existingUser);

        await removeFromCart(req, res);

        expect(existingUser.cart).to.deep.equal([{ productId: '67890', quantity: 1 }]); // Product removed
        expect(saveStub.calledOnce).to.be.true; // User saved
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Product removed from cart.',
            cart: existingUser.cart,
        })).to.be.true;
    });

    it('should do nothing if the product is not in the cart', async () => {
        req.body = { username: 'existingUser', id: '99999' }; // Product not in cart

        const existingUser = {
            cart: [{ productId: '12345', quantity: 2 }],
            save: saveStub,
        };

        userStub.resolves(existingUser);

        await removeFromCart(req, res);

        expect(existingUser.cart).to.deep.equal([{ productId: '12345', quantity: 2 }]); // Cart remains the same
        expect(saveStub.calledOnce).to.be.true; // User saved
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Product removed from cart.',
            cart: existingUser.cart,
        })).to.be.true;
    });

    it('should return 500 if there is a server error', async () => {
        req.body = { username: 'existingUser', id: '12345' };

        userStub.rejects(new Error('Database error')); // Simulate a database error

        await removeFromCart(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({
            message: 'Internal Server Error',
            error: 'Database error',
        })).to.be.true;
    });
});
