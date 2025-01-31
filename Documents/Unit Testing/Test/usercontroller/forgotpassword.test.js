import { expect } from 'chai';
import sinon from 'sinon';
import { forgot_password } from '../../controller/user-controller.js';
import User from '../../model/user-schema.js';
import Otp from '../../model/otp-schema.js';

describe('forgot_password Controller', () => {
    let mockRequest, mockResponse, findOneUserStub, findOneOtpStub, saveOtpStub;

    beforeEach(() => {
        // Mock the request and response objects
        mockRequest = {
            body: {
                email: 'test@example.com'
            }
        };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        // Stub the User.findOne and Otp.findOne methods
        findOneUserStub = sinon.stub(User, 'findOne');
        findOneOtpStub = sinon.stub(Otp, 'findOne');
        saveOtpStub = sinon.stub(Otp.prototype, 'save');
    });

    afterEach(() => {
        // Restore all stubs
        findOneUserStub.restore();
        findOneOtpStub.restore();
        saveOtpStub.restore();
    });

    it('should return 400 if email is missing', async () => {
        mockRequest.body = {}; // Simulate missing email

        await forgot_password(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: "An email is required." })).to.be.true;
    });

    it('should return 400 if the email format is invalid', async () => {
        mockRequest.body.email = 'invalid-email'; // Simulate invalid email format

        await forgot_password(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(400)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Invalid email format.' })).to.be.true;
    });

    it('should return 401 if no account is found with the provided email', async () => {
        findOneUserStub.returns(null); // Simulate user not found

        await forgot_password(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(401)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'No account found with the provided email.' })).to.be.true;
    });

    it('should return 200 if OTP has already been sent', async () => {
        findOneUserStub.returns({ email: 'test@example.com' }); // Simulate user found
        findOneOtpStub.returns({ email: 'test@example.com', otp: '1234' }); // Simulate OTP already exists

        await forgot_password(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: "Otp already sent" })).to.be.true;
    });

    it('should send OTP and return 200 if OTP is successfully generated', async () => {
        findOneUserStub.returns({ email: 'test@example.com' }); // Simulate user found
        findOneOtpStub.returns(null); // Simulate no existing OTP

        // Simulate the OTP save success
        saveOtpStub.returns(Promise.resolve());

        await forgot_password(mockRequest, mockResponse);

        expect(saveOtpStub.calledOnce).to.be.true;
        expect(mockResponse.status.calledOnceWithExactly(200)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({
            message: 'Password reset OTP email sent',
            data: { email: 'test@example.com' }
        })).to.be.true;
    });

    it('should return 500 if there is an internal server error', async () => {
        const errorMessage = 'Database error';
        findOneUserStub.throws(new Error(errorMessage)); // Simulate error in finding user

        await forgot_password(mockRequest, mockResponse);

        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: errorMessage })).to.be.true;
    });
});
