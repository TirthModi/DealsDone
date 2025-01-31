import { getProducts } from '../../../controller/product-controller.js';
import Product from '../../../model/product-schema.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('getProducts', () => {
    it('should return all products when no category is provided', async () => {
        const fakeProducts = [
            { id: '1', category: 'electronics', title: 'Product 1', price: { amount: 100 } },
            { id: '2', category: 'clothing', title: 'Product 2', price: { amount: 50 } },
        ];

        const req = { query: {} };  // No category filter
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

        sinon.stub(Product, 'find').resolves(fakeProducts);

        await getProducts(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(fakeProducts)).to.be.true;

        Product.find.restore(); // Restore the original function
    });

    it('should return products filtered by category', async () => {
        const fakeProducts = [
            { id: '1', category: 'electronics', title: 'Product 1', price: { amount: 100 } },
            { id: '2', category: 'electronics', title: 'Product 2', price: { amount: 200 } },
        ];
    
        const req = { query: { category: 'electronics' } };  // Category filter
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves(fakeProducts);
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(fakeProducts)).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });
    

    it('should return an empty array if no products match the category', async () => {
        const fakeProducts = [];
    
        const req = { query: { category: 'nonexistent-category' } };  // No matching category
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves(fakeProducts);
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(fakeProducts)).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });
    
    it('should return 500 if there is a server error', async () => {
        const req = { query: { category: 'electronics' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').throws(new Error('Database error'));  // Simulate a DB error
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Database error' })).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });

    it('should return product with optional fields', async () => {
        const fakeProduct = {
            id: '1',
            category: 'electronics',
            url: 'http://example.com/product1',
            detailUrl: 'http://example.com/product1/detail',
            title: { en: 'Product 1' },
            price: { amount: 100, currency: 'USD' },
            quantity: 10,
            description: 'Great product',
            discount: '10%',
            tagline: 'Best in class',
        };
    
        const req = { query: { category: 'electronics' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves([fakeProduct]);
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([fakeProduct])).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });

    it('should handle special characters in category filter', async () => {
        const fakeProduct = {
            id: '1',
            category: 'electronics/smartphones',
            title: 'Smartphone 1',
            price: { amount: 200 },
        };
    
        const req = { query: { category: 'electronics/smartphones' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves([fakeProduct]);
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([fakeProduct])).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });

    it('should return an empty array if no products are found', async () => {
        const req = { query: {} };  // No category filter
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves([]);  // No products in the DB
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([])).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });

    it('should return an empty array for invalid category', async () => {
        const req = { query: { category: 'nonexistent-category' } };  // Invalid category filter
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves([]);  // No products in the DB matching the category
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([])).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });

    it('should return 500 if there is an error in the database query', async () => {
        const req = { query: { category: 'electronics' } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').throws(new Error('Database connection error'));  // Simulate DB error
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ message: 'Database connection error' })).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });

    it('should return products for a numeric category filter', async () => {
        const fakeProduct = { id: '1', category: '123', title: 'Product 1', price: { amount: 100 } };
    
        const req = { query: { category: '123' } };  // Numeric category filter
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves([fakeProduct]);
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith([fakeProduct])).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });

    it('should return all products if the category filter is an empty string', async () => {
        const fakeProducts = [
            { id: '1', category: 'electronics', title: 'Product 1', price: { amount: 100 } },
            { id: '2', category: 'clothing', title: 'Product 2', price: { amount: 50 } },
        ];
    
        const req = { query: { category: '' } };  // Empty category filter
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
        sinon.stub(Product, 'find').resolves(fakeProducts);
    
        await getProducts(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(fakeProducts)).to.be.true;
    
        Product.find.restore(); // Restore the original function
    });
    

});
