import Product from '../model/product-schema.js';

export const addProduct = async (request, response) => {
  try {
    const product = request.body;

    // Nested if condition for validation
    if (!product.id) {
      return response.status(400).json({ message: 'Product ID is required.' });
    } else if (!product.category) {
      return response.status(400).json({ message: 'Category is required.' });
    } else if (!product.url) {
      return response.status(400).json({ message: 'Product URL is required.' });
    } else if (!product.detailUrl) {
      return response.status(400).json({ message: 'Detail URL is required.' });
    } else if (!product.title) {
      return response.status(400).json({ message: 'Product title is required.' });
    } else if (!product.price) {
      return response.status(400).json({ message: 'Product price is required.' });
    } else if (!product.quantity) {
      return response.status(400).json({ message: 'Product quantity is required.' });
    } else if (!product.description) {
      return response.status(400).json({ message: 'Product description is required.' });
    }

    const newProduct = new Product(product);
    await newProduct.save();

    return response.status(200).json({ message: 'Product added successfully.', product });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};