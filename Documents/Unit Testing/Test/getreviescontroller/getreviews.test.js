import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { getreviews } from '../../controller/getreviews-controller.js';
import Review from '../../model/review-schema.js';





describe('getreviews Controller ', () => {
    let mockRequest, mockResponse, findStub;

    beforeEach(() => {
        // Mock the request and response objects
        mockRequest = {
            params: {
                productId: '12345'  // The productId you're testing
            }
        };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()  // Chainable stub for status
        };

        // Stub the Review.find() method
        findStub = sinon.stub(Review, 'find');
    });

    afterEach(() => {
        // Restore all stubs after each test
        findStub.restore();
    });

    it('should return empty array when no reviews are found for a product', async () => {
        // Mock Review.find() to return an empty array
        findStub.returns({
            sort: sinon.stub().returns([])
        });

        // Call the controller function
        await getreviews(mockRequest, mockResponse);

        // Check if the response was called with an empty array
        expect(mockResponse.json.calledOnceWithExactly([])).to.be.true;
        expect(mockResponse.status.called).to.be.false;  // status should not have been called
    });

    it('should return 500 if there is a database connection issue or timeout', async () => {
        // Mock a database connection error or timeout
        findStub.throws(new Error('Database connection error'));

        // Call the controller function
        await getreviews(mockRequest, mockResponse);

        // Check if status 500 was returned
        expect(mockResponse.status.calledOnceWithExactly(500)).to.be.true;
        expect(mockResponse.json.calledOnceWithExactly({ message: 'Error fetching reviews' })).to.be.true;
    });

    it('should return reviews sorted by date when multiple reviews exist', async () => {
        const mockReviews = [
            { productId: '12345', rating: '5', reviewText: 'Great product', date: new Date('2023-12-01') },
            { productId: '12345', rating: '4', reviewText: 'Good quality', date: new Date('2023-12-02') }
        ];

        // Mock the response of the Review.find method
        findStub.returns({
            sort: sinon.stub().returns(mockReviews)
        });

        // Call the controller function
        await getreviews(mockRequest, mockResponse);

        // Check if the response was called with the correct sorted reviews
        expect(mockResponse.json.calledOnceWithExactly(mockReviews)).to.be.true;
        expect(mockResponse.status.called).to.be.false;  // status should not have been called on success
    });
});
