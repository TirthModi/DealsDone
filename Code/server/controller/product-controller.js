import { request, response } from 'express';
import Product from '../model/product-schema.js';

export const getProducts = async (request, response) => {
    try {
        const { category } = request.query;

        const filter = {};
        if (category) filter.category = category; // Filter products by category

        const products = await Product.find(filter); // Query database with filters
        return response.status(200).json(products);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};


export const getProductById = async(request, response)=>{
    try{
        const id = request.params.id;
        const product = await Product.findOne({ 'id':id });

        if (!product) {
            return response.status(404).json({ message: 'Product not found' });
        }

        return response.status(200).json(product);
    }catch(error){
        return response.status(500).json({message : error.message});
    }
}