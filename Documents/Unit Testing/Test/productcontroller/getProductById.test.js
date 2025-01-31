import sinon from 'sinon';
import assert from 'assert';
import Product from '../../model/product-schema.js';
import { getProductById } from '../../controller/product-controller.js';

describe('getProductById API Function', function () {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: '1', // Mock product ID
            },
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return a product by ID if it exists', async () => {
        const mockProduct = {
            id: '1',
            category: 'Electronics',
            title: { shortTitle: 'Phone' },
            price: { value: 599 },
        };

        sinon.stub(Product, 'findOne').resolves(mockProduct); // Mock database query

        await getProductById(req, res);

        assert(res.status.calledWith(200));
        assert(res.json.calledWith(mockProduct));
    });

    it('should return null if no product is found with the given ID', async () => {
        sinon.stub(Product, 'findOne').resolves(null); // Mock product not found

        await getProductById(req, res);

        assert(res.status.calledWith(200));
        assert(res.json.calledWith(null));
    });
        it('should properly handle a database timeout', async () => {
            sinon.stub(Product, 'findOne').callsFake(() => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), 100))); // Simulate timeout

            await getProductById(req, res);

            assert(res.status.calledWith(500));
            assert(res.json.calledWith({ message: 'Timeout' }));
        });

        it('should handle unexpected errors gracefully', async () => {
            sinon.stub(Product, 'findOne').throws(new Error('Unexpected error')); // Simulate unexpected error
    
            await getProductById(req, res);
    
            assert(res.status.calledWith(500));
            assert(res.json.calledWith({ message: 'Unexpected error' }));
        });

    it('should return a 500 error if there is a database error', async () => {
        sinon.stub(Product, 'findOne').throws(new Error('Database error')); // Simulate a database error

        await getProductById(req, res);

        assert(res.status.calledWith(500));
        assert(res.json.calledWith({ message: 'Database error' }));
    });
});

