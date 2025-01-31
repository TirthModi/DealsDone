import sinon from 'sinon';
import assert from 'assert';
import Product from '../../model/product-schema.js';
import { getProducts } from '../../controller/product-controller.js';

describe('getProducts API Function', function () {
    let req, res;

    beforeEach(() => {
        req = {
            query: {}, // Mock query parameters
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return all products if no category filter is provided', async () => {
        const mockProducts = [
            { id: '1', category: 'Electronics' },
            { id: '2', category: 'Books' },
        ];
        sinon.stub(Product, 'find').resolves(mockProducts); // Mock database query

        await getProducts(req, res);

        assert(res.status.calledWith(200));
        assert(res.json.calledWith(mockProducts));
    });

    it('should return products filtered by category', async () => {
        const mockProducts = [{ id: '1', category: 'Electronics' }];
        req.query.category = 'Electronics';
        sinon.stub(Product, 'find').resolves(mockProducts); // Mock database query

        await getProducts(req, res);

        assert(res.status.calledWith(200));
        assert(res.json.calledWith(mockProducts));
    });

    it('should return an empty array if no products match the category filter', async () => {
        req.query.category = 'NonExistentCategory';
        sinon.stub(Product, 'find').resolves([]); // Mock empty result

        await getProducts(req, res);

        assert(res.status.calledWith(200));
        assert(res.json.calledWith([]));
    });

    it('should return a 500 error if there is a database error', async () => {
        sinon.stub(Product, 'find').throws(new Error('Database error')); // Simulate a database error

        await getProducts(req, res);

        assert(res.status.calledWith(500));
        assert(res.json.calledWith({ message: 'Database error' }));
    });

    it('should return products with additional filters if multiple query parameters are provided', async () => {
        req.query = { category: 'Electronics', priceRange: '500-1000' };
        const mockProducts = [
            { id: '1', category: 'Electronics', price: { value: 600 } },
        ];
        const stubFind = sinon.stub(Product, 'find').callsFake((filter) => {
            assert.deepStrictEqual(filter, { category: 'Electronics' });
            return Promise.resolve(mockProducts); // Mock query result
        });

        await getProducts(req, res);

        assert(res.status.calledWith(200));
        assert(res.json.calledWith(mockProducts));
        stubFind.restore();
    });

    it('should handle a large number of products without error', async () => {
        const mockProducts = Array.from({ length: 1000 }, (_, i) => ({
            id: `${i + 1}`,
            category: 'Electronics',
        }));
        sinon.stub(Product, 'find').resolves(mockProducts); // Mock large result set

        await getProducts(req, res);

        assert(res.status.calledWith(200));
        assert(res.json.calledWith(mockProducts));
    });
});
