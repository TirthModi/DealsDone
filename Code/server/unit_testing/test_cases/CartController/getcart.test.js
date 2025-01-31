import { expect } from 'chai';
import sinon from 'sinon';
import User from '../../../model/user-schema.js';
import { getCart } from '../../../controller/cart-controller.js';

describe('getCart Controller', () => {
    let req, res, userStub;

    beforeEach(() => {
        req = { params: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        userStub = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 404 if user is not found', async () => {
        req.params = { username: 'nonexistentUser' };
        userStub.resolves(null);

        await getCart(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'User not found.' })).to.be.true;
    });

    it('should return the user cart if the user is found', async () => {
        req.params = { username: 'existingUser' };

        const userCart = [
            { productId: { id: '12345', title: { name: 'Product 1' } }, quantity: 2 },
            { productId: { id: '67890', title: { name: 'Product 2' } }, quantity: 1 },
        ];

        const user = {
            username: 'existingUser',
            cart: userCart,
            populate: sinon.stub().resolvesThis(),
        };
        userStub.resolves(user);

        await getCart(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ cart: userCart })).to.be.true;
    });

    it('should return 500 if there is a server error', async () => {
        req.params = { username: 'existingUser' };
        userStub.rejects(new Error('Database error'));

        await getCart(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({
            message: 'Internal Server Error',
            error: 'Database error',
        })).to.be.true;
    });
});
