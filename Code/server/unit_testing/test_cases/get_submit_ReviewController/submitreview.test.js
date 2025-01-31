import { expect } from 'chai';
import sinon from 'sinon';
import Review from '../../../model/review-schema.js';
import { submitReview } from '../../../controller/submitReview-controller.js';

describe('submitReview Controller', () => {
    let req, res, saveStub;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        saveStub = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 400 if rating is missing', async () => {
        req.body = {
            productId: '12345',
            reviewText: 'Nice product!',
        }; // Missing rating

        await submitReview(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Missing required fields' })).to.be.true;
    });

    it('should return 400 if reviewText is missing', async () => {
        req.body = {
            productId: '12345',
            rating: '5', // Rating is present as a string
        }; // Missing reviewText

        await submitReview(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Missing required fields' })).to.be.true;
    });

    it('should return 400 if productId is missing', async () => {
        req.body = {
            rating: '5', // Valid rating
            reviewText: 'Amazing!',
        }; // Missing productId

        await submitReview(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Missing required fields' })).to.be.true;
    });

    it('should return 400 if rating is outside allowed range', async () => {
        req.body = {
            productId: '12345',
            rating: '6',  // invalid rating (greater than 5)
            reviewText: 'Good product!'
        };

        await submitReview(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Rating must be a number between 1 and 5' })).to.be.true;
    });

    it('should return 400 if rating is less than the allowed range', async () => {
        req.body = {
            productId: '12345',
            rating: '0',  // invalid rating (less than 1)
            reviewText: 'Terrible product!'
        };

        await submitReview(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Rating must be a number between 1 and 5' })).to.be.true;
    });

});
