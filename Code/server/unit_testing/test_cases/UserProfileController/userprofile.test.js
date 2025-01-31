import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { getUserProfile } from '../../../controller/user-profile-controller.js';  // Assuming getUserProfile is in this path
import User from '../../../model/user-schema.js';

describe('getUserProfile function', () => {
    let findOneStub;
    let req;
    let res;

    it('should return user profile when username is found', async () => {
        const fakeUser = {
            firstname: 'John',
            lastname: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phone: '1234567890',
            cart: [],
        };

        const req = { query: { username: 'johndoe' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

        sinon.stub(User, 'findOne').resolves(fakeUser);

        await getUserProfile(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            firstname: 'John',
            lastname: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phone: '1234567890',
            cart: [],
        })).to.be.true;

        User.findOne.restore(); // Restore the original function
    });


    it('should return 400 if username is missing', async () => {
        const req = { query: {} }; // Missing username
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        await getUserProfile(req, res);
    
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Username is required' })).to.be.true;
    });

    it('should return 404 if user is not found', async () => {
        const req = { query: { username: 'nonexistentuser' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(User, 'findOne').resolves(null); // No user found
    
        await getUserProfile(req, res);
    
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'User not found' })).to.be.true;
    
        User.findOne.restore(); // Restore the original function
    });    
    
    it('should return 500 if there is a server error', async () => {
        const req = { query: { username: 'johndoe' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(User, 'findOne').throws(new Error('Database error')); // Simulate DB error
    
        await getUserProfile(req, res);
    
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Server error' })).to.be.true;
    
        User.findOne.restore(); // Restore the original function
    });
    
});
