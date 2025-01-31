import sinon from 'sinon';
import assert from 'assert';
import Review from '../../model/review-schema.js';
import { submitReview } from '../../controller/submitReview-controller.js';

describe('submitReview API Function', function () {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}, // Mock request body
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        sinon.restore();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should submit a review successfully and return 201 status', async () => {
        const mockReview = {
            productId: '12345',
            rating: '5',
            reviewText: 'Great product!',
        };

        const mockSavedReview = {
            ...mockReview,
            _id: 'some-generated-id',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        req.body = mockReview;
        sinon.stub(Review.prototype, 'save').resolves(mockSavedReview);

        await submitReview(req, res);

        assert(res.status.calledWith(201));
        assert(
            res.json.calledWithMatch({
                message: 'Review submitted successfully',
                review: sinon.match({
                    productId: '12345',
                    rating: '5',
                    reviewText: 'Great product!',
                }),
            })
        );
    });

    it('should return 400 status if rating or reviewText is missing', async () => {
        req.body = { productId: '12345', rating: '' };

        await submitReview(req, res);

        assert(res.status.calledWith(400));
        assert(
            res.json.calledWith({
                message: 'Missing required fields',
            })
        );
    });

it('should return 400 status if productId is missing', async () => {
    req.body = { rating: '4', reviewText: 'Good product!' };

    await submitReview(req, res);

    assert(res.status.calledWith(400));
    assert(
        res.json.calledWith({
            message: 'Missing required fields',
        })
    );
});

    it('should return 400 status if body is empty', async () => {
        req.body = {};

        await submitReview(req, res);

        assert(res.status.calledWith(400));
        assert(
            res.json.calledWith({
                message: 'Missing required fields',
            })
        );
    });

it('should return 400 status if rating is not a valid number', async () => {
    req.body = { productId: '12345', rating: 'invalid', reviewText: 'Nice product!' };

    await submitReview(req, res);

    assert(res.status.calledWith(400));
    assert(
        res.json.calledWith({
            message: 'Invalid rating value',
        })
    );
});

    it('should handle database save errors gracefully', async () => {
        req.body = {
            productId: '12345',
            rating: '5',
            reviewText: 'Great product!',
        };

        sinon.stub(Review.prototype, 'save').throws(new Error('Database error'));

        await submitReview(req, res);

        assert(res.status.calledWith(500));
        assert(
            res.json.calledWith({
                message: 'Internal server error',
            })
        );
    });

    it('should handle unexpected errors gracefully', async () => {
        req.body = {
            productId: '12345',
            rating: '5',
            reviewText: 'Great product!',
        };

        sinon.stub(Review.prototype, 'save').throws(new Error('Unexpected error'));

        await submitReview(req, res);

        assert(res.status.calledWith(500));
        assert(
            res.json.calledWith({
                message: 'Internal server error',
            })
        );
    });
});
