import { expect } from 'chai';
import sinon from 'sinon';
import Product from '../../model/product-schema.js';
import { addProduct } from '../../controller/addProduct-controller.js'

describe('addProduct Controller', () => {
    let req, res, productStub;

    beforeEach(() => {
        // Mock request and response objects
        req = {
            body: {},
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        // Stub Product save method
        productStub = sinon.stub(Product.prototype, 'save');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 400 if Product ID is missing', async () => {
        req.body = {
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product ID is required.' })).to.be.true;
    });

    it('should return 400 if category is missing', async () => {
        req.body = {
            id: '12345',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Category is required.' })).to.be.true;
    });

    it('should save product and return 200 if all fields are valid', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        productStub.resolves(); // Simulate successful save

        await addProduct(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Product added successfully.',
            product: req.body,
        })).to.be.true;
    });

    it('should return 500 if there is a database error', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        productStub.rejects(new Error('Database error')); // Simulate save failure

        await addProduct(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Database error' })).to.be.true;
    });

    // Test case 1: Product ID is missing
    it('should return 400 if Product ID is missing', async () => {
        req.body = {
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product ID is required.' })).to.be.true;
    });

    // Test case 2: Product is successfully saved
    it('should save product and return 200 if all fields are valid', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        productStub.resolves(); // Simulate successful save

        await addProduct(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            message: 'Product added successfully.',
            product: req.body,
        })).to.be.true;
    });

    // Test case 3: Missing product category
    it('should return 400 if category is missing', async () => {
        req.body = {
            id: '12345',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Category is required.' })).to.be.true;
    });

    // Test case 4: Missing product URL
    it('should return 400 if Product URL is missing', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product URL is required.' })).to.be.true;
    });

    // Test case 5: Missing product detail URL
    it('should return 400 if Detail URL is missing', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Detail URL is required.' })).to.be.true;
    });

    // Test case 6: Missing product title
    it('should return 400 if Product title is missing', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product title is required.' })).to.be.true;
    });

    // Test case 7: Missing product price
    it('should return 400 if Product price is missing', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            quantity: 100,
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product price is required.' })).to.be.true;
    });

    // Test case 8: Missing product quantity
    it('should return 400 if Product quantity is missing', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            description: 'This is a sample product',
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product quantity is required.' })).to.be.true;
    });

    // Test case 9: Missing product description
    it('should return 400 if Product description is missing', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
        };

        await addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Product description is required.' })).to.be.true;
    });

    // Test case 10: Product creation fails due to database error
    it('should return 500 if there is a database error', async () => {
        req.body = {
            id: '12345',
            category: 'Electronics',
            url: 'http://example.com/product',
            detailUrl: 'http://example.com/product/detail',
            title: { shortTitle: 'Smartphone', longTitle: 'Latest Smartphone' },
            price: { mrp: 15000, cost: 12000, discount: '20%' },
            quantity: 100,
            description: 'This is a sample product',
        };

        productStub.rejects(new Error('Database error')); // Simulate save failure

        await addProduct(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Database error' })).to.be.true;
    });


});