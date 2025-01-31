import { expect } from 'chai';
import sinon from 'sinon';
import User from '../../../model/user-schema.js';
import { clearCart } from '../../../controller/cart-controller.js';

describe('clearCart Controller', () => {
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

    it('should return 400 if username is missing', async () => {
        req.body = {}; // Missing username

        await clearCart(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Username is required.' })).to.be.true;
    });

    it('should return 404 if user is not found', async () => {
        req.body = { username: 'nonexistentUser' };

        userStub.resolves(null); // User not found

        await clearCart(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'User not found.' })).to.be.true;
    });

    it('should clear the user cart successfully', async () => {
        req.body = { username: 'existingUser' };

        const existingUser = {
            cart: [{ productId: '12345', quantity: 2 }],
            save: saveStub,
        };

        userStub.resolves(existingUser); // User found

        await clearCart(req, res);

        expect(existingUser.cart).to.deep.equal([]); // Cart should be cleared
        expect(saveStub.calledOnce).to.be.true; // User saved
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Cart cleared successfully.',
        })).to.be.true;
    });

    it('should return 500 if there is a server error', async () => {
        req.body = { username: 'existingUser' };

        userStub.rejects(new Error('Database error')); // Simulate a database error

        await clearCart(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({
            message: 'Internal Server Error',
            error: 'Database error',
        })).to.be.true;
    });
});
