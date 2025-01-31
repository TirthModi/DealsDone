import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sellerSignup } from '../../controller/seller-controller.js';
import Seller from '../../model/seller-schema.js';

describe('sellerSignup Controller', () => {
    let mockRequest, mockResponse, findOneStub, saveStub, bcryptStub, jwtStub;

    beforeEach(() => {
        // Mock request and response objects
        mockRequest = {
            body: {
                username: 'testuser',
                password: 'testPassword',
                email: 'test@example.com'
            }
        };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        // Stubs for User methods and bcrypt
        findOneStub = sinon.stub(Seller, 'findOne');
        saveStub = sinon.stub(Seller.prototype, 'save');
        bcryptStub = sinon.stub(bcrypt, 'hash');
        jwtStub = sinon.stub(jwt, 'sign').returns('mockedToken');
    });

    afterEach(() => {
        // Restore all stubs
        findOneStub.restore();
        saveStub.restore();
        bcryptStub.restore();
        jwtStub.restore();
    });

    it('should return 401 if the username already exists', async () => {
        findOneStub.returns({ username: 'testuser' }); // Simulate existing user

        await sellerSignup(mockRequest, mockResponse);

        expect(findOneStub.calledOnceWithExactly({ username: 'testuser' })).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(401)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({ message: 'Username already exist' })
        ).to.be.true;
    });

    it('should return 200 and save the user if the username does not exist', async () => {
        findOneStub.returns(null); // Simulate no existing user
        bcryptStub.resolves('hashedPassword'); // Simulate password hashing
        saveStub.resolves(); // Simulate successful save

        await sellerSignup(mockRequest, mockResponse);

        expect(findOneStub.calledOnceWithExactly({ username: 'testuser' })).to.be.true;
        expect(bcryptStub.calledOnceWithExactly('testPassword', 10)).to.be.true;
        expect(saveStub.calledOnce).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({
                seller: sinon.match({ username: 'testuser', email: 'test@example.com' }),
                token: 'mockedToken'
            })
        ).to.be.true;
    });

    it('should return 500 if an error occurs during signup', async () => {
        findOneStub.throws(new Error('Database error')); // Simulate error

        await sellerSignup(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({ message: 'Database error' })
        ).to.be.true;
    });

    it('should return 500 if bcrypt hashing fails', async () => {
        findOneStub.returns(null); // Simulate no existing user
        bcryptStub.rejects(new Error('Hashing error')); // Simulate bcrypt error

        await sellerSignup(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({ message: 'Hashing error' })
        ).to.be.true;
    });

    it('should return 500 if saving the user fails', async () => {
        findOneStub.returns(null); // Simulate no existing user
        bcryptStub.resolves('hashedPassword'); // Simulate password hashing
        saveStub.rejects(new Error('Save error')); // Simulate save error

        await sellerSignup(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(
            mockResponse.json.calledOnceWithExactly({ message: 'Save error' })
        ).to.be.true;
    });

    it('should include a token in the response', async () => {
        findOneStub.returns(null); // Simulate no existing user
        bcryptStub.resolves('hashedPassword'); // Simulate password hashing
        saveStub.resolves(); // Simulate successful save

        await sellerSignup(mockRequest, mockResponse);

        expect(jwtStub.calledOnceWithExactly(
            sinon.match({ _id: sinon.match.any, username: 'testuser', role: 'Seller' }),
            sinon.match.any,
            sinon.match.any
        )).to.be.true;
        expect(mockResponse.json.firstCall.args[0].token).to.equal('mockedToken');
    });
});
