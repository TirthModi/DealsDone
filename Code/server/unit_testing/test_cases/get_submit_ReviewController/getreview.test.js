import { expect } from 'chai';
import sinon from 'sinon';
import { getreviews } from '../../../controller/getreviews-controller.js';
import Review from '../../../model/review-schema.js'; 

describe('getreviews Controller', () => {
    let req, res, findStub;

    beforeEach(() => {
        // Mock the request object
        req = {
            params: {
                productId: '12345',  // Ensure productId is correctly set
            }
        };

        // Mock the response object
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 400 if productId is missing in params', async () => {
        req.params.productId = undefined;  // Simulate missing productId

        await getreviews(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product ID is required' })).to.be.true;
    });

    it('should return 500 if there is a database error', async () => {
        // Simulate a database error
        findStub = sinon.stub(Review, 'find').throws(new Error('Database error'));

        await getreviews(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Error fetching reviews', error: 'Database error' })).to.be.true;
    });

    it('should return 200 and reviews if productId exists and reviews are found', async () => {
        const reviews = [
            { productId: '12345', rating: '5', reviewText: 'Great!', date: new Date('2022-01-01') },
            { productId: '12345', rating: '4', reviewText: 'Good!', date: new Date('2022-02-01') },
        ];

        // Stub the Review.find() method to return mock data
        findStub = sinon.stub(Review, 'find').returns(Promise.resolve(reviews));

        await getreviews(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(reviews)).to.be.true;
    });

    it('should return 200 and an empty array if no reviews are found for the productId', async () => {
        const reviews = [];

        // Stub the Review.find() method to return an empty array
        findStub = sinon.stub(Review, 'find').returns(Promise.resolve(reviews));

        await getreviews(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(reviews)).to.be.true;
    });

    it('should return 400 if productId is missing in params', async () => {
        req.params.productId = undefined;  // Simulate missing productId

        await getreviews(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product ID is required' })).to.be.true;
    });

    it('should return 500 if there is a database error', async () => {
        // Simulate a database error
        findStub = sinon.stub(Review, 'find').throws(new Error('Database error'));

        await getreviews(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Error fetching reviews', error: 'Database error' })).to.be.true;
    });

    it('should return 200 and sorted reviews by date in descending order', async () => {
        const reviews = [
            { productId: '12345', rating: '5', reviewText: 'Great product!', date: new Date('2023-02-01') },
            { productId: '12345', rating: '4', reviewText: 'Good product.', date: new Date('2023-01-01') },
        ];

        // Stub the Review.find() method to return sorted reviews by date
        findStub = sinon.stub(Review, 'find').returns(Promise.resolve(reviews));

        await getreviews(req, res);

        // Verify if the reviews are sorted by date descending (most recent first)
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(reviews)).to.be.true;
        expect(reviews[0].date).to.be.greaterThan(reviews[1].date);
    });

    it('should return 404 if no reviews are found for a non-existent productId', async () => {
        req.params.productId = 'non-existent-product-id';  // Simulate a non-existent productId

        const reviews = [];

        // Stub the Review.find() method to return an empty array
        findStub = sinon.stub(Review, 'find').returns(Promise.resolve(reviews));

        await getreviews(req, res);

        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'No reviews found for this product' })).to.be.true;
    });
});
