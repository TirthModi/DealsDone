import { expect } from 'chai';
import sinon from 'sinon';
import Product from '../../../model/product-schema.js';
import { getProductById } from '../../../controller/product-controller.js';

// Test Suite for getProductById
describe('getProductById', function () {

    afterEach(() => {
        sinon.restore(); // Restore all the stubs after each test
    });

    it('should return a product when a valid ID is passed', async function () {
        const mockProduct = {
            id: '123',
            category: 'electronics',
            title: { name: 'Product Name' },
            price: { amount: 100 },
            quantity: 10,
            description: 'Product description',
            discount: '10%',
            tagline: 'Best deal'
        };

        // Stub Product.findOne to return mockProduct
        sinon.stub(Product, 'findOne').resolves(mockProduct);

        const request = { params: { id: '123' } };

        const response = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await getProductById(request, response);

        expect(Product.findOne.calledOnce).to.be.true;
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(mockProduct)).to.be.true;
    });

    it('should return a 404 status if product is not found', async function () {
        // Stub Product.findOne to return null (no product found)
        sinon.stub(Product, 'findOne').resolves(null);

        const request = { params: { id: 'nonexistent' } };

        const response = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await getProductById(request, response);

        expect(Product.findOne.calledOnce).to.be.true;
        expect(response.status.calledWith(404)).to.be.true;
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
    });

    it('should handle errors and return a 500 status', async function () {
        const errorMessage = 'Database error';
        // Stub Product.findOne to simulate an error
        sinon.stub(Product, 'findOne').rejects(new Error(errorMessage));

        const request = { params: { id: '123' } };

        const response = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        await getProductById(request, response);

        expect(Product.findOne.calledOnce).to.be.true;
        expect(response.status.calledWith(500)).to.be.true;
        expect(response.json.calledWith({ message: errorMessage })).to.be.true;
    });
});
