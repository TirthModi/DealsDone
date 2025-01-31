import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addProduct } from "../../../service/api";
import { useNavigate } from 'react-router-dom';

const categories = [
  'Top Offers',
  'Grocery',
  'Mobile',
  'Fashion',
  'Electronics',
  'Home',
  'Appliances',
  'Beauty'
];

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: '',
    category: '',
    url: '',
    detailUrl: '',
    title: {
      shortTitle: '',
      longTitle: '',
    },
    price: {
      mrp: '',
      cost: '',
      discount: '',
    },
    quantity: '',
    description: '',
    discount: '',
    tagline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProduct((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const validateProductFields = (product) => {
    const errors = {};

    if (!product.id.trim()) {
        errors.id = "Error: Product ID is required .";
    } else if (!/^\d+$/.test(product.id)) {
        errors.id = "Error: Product ID must contain only numeric characters .";
    }

    const urlRegex = /^(https?:\/\/[^\s]+)$/;
    if (!product.url.trim()) {
        errors.url = "Error: Image URL is required.";
    } else if (!urlRegex.test(product.url)) {
        errors.url = "Error: Invalid Image URL format.";
    }

    if (!product.detailUrl.trim()) {
        errors.detailUrl = "Error: Detail Image URL is required .";
    } else if (!urlRegex.test(product.detailUrl)) {
        errors.detailUrl = "Error: Invalid Detail Image URL format .";
    }

    if (!product.title.shortTitle.trim()) {
        errors.shortTitle = "Error: Short Title is required .";
    } else if (/^\d+$/.test(product.title.shortTitle)) {
        errors.shortTitle = "Error: Short Title must not be numeric only .";
    }

    if (!product.title.longTitle.trim()) {
        errors.longTitle = "Error: Long Title is required (EC9).";
    } else if (/^\d+$/.test(product.title.longTitle)) {
        errors.longTitle = "Error: Long Title must not be numeric only .";
    }

    if (!product.price.mrp) {
        errors.mrp = "Error: MRP is required .";
    } else if (!/^\d+(\.\d+)?$/.test(product.price.mrp) || Number(product.price.mrp) <= 0) {
        errors.mrp = "Error: MRP must be a positive number .";
    }

    if (!product.price.cost) {
        errors.cost = "Error: Cost is required .";
    } else if (!/^\d+(\.\d+)?$/.test(product.price.cost) || Number(product.price.cost) <= 0) {
        errors.cost = "Error: Cost must be a positive number .";
    }

    if (product.price.discount === '') {
        errors.discount = "Error: Discount is required .";
    } else if (!/^\d+(\.\d+)?$/.test(product.price.discount) || Number(product.price.discount) < 0) {
        errors.discount = "Error: Discount must be a non-negative number .";
    }

    if (product.quantity === '') {
        errors.quantity = "Error: Quantity is required .";
    } else if (!/^\d+$/.test(product.quantity) || Number(product.quantity) <= 0) {
        errors.quantity = "Error: Quantity must be a positive integer .";
    }

    if (!product.description.trim()) {
        errors.description = "Error: Description is required .";
    }

    if (!product.tagline.trim()) {
        errors.tagline = "Error: Tagline is required .";
    }

    return errors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Product details submitted:', product);

    const response = await addProduct(product);
    // Validate product fields
    const errors = validateProductFields(product);

    if (Object.keys(errors).length > 0) {
        alert(Object.values(errors).join("\n"));
        console.error("Validation Errors:", errors);
        return;
    }

    else{
      if (!response) return;
    navigate('./');
    }
};


  return (
    <Box className="add-product-container">
      <Typography variant="h4" align="center" gutterBottom className="page-title">
        Add a New Product
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={4} className="form-paper">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Product ID"
                    name="id"
                    fullWidth
                    variant="outlined"
                    value={product.id}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Image URL"
                    name="url"
                    fullWidth
                    variant="outlined"
                    value={product.url}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Detail Image URL"
                    name="detailUrl"
                    fullWidth
                    variant="outlined"
                    value={product.detailUrl}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Short Title"
                    name="title.shortTitle"
                    fullWidth
                    variant="outlined"
                    value={product.title.shortTitle}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Long Title"
                    name="title.longTitle"
                    fullWidth
                    variant="outlined"
                    value={product.title.longTitle}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="MRP"
                    name="price.mrp"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={product.price.mrp}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Cost"
                    name="price.cost"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={product.price.cost}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Discount"
                    name="price.discount"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={product.price.discount}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Discount Tag"
                    name="discount"
                    fullWidth
                    variant="outlined"
                    value={product.discount}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={product.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tagline"
                    name="tagline"
                    fullWidth
                    variant="outlined"
                    value={product.tagline}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>

              <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddPhotoAlternateIcon />}
                  className="submit-button"
                >
                  Add Product
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="product-preview">
            <CardMedia
              component="img"
              height="200"
              image={product.url || 'https://via.placeholder.com/300'}
              alt={product.title.shortTitle}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title.shortTitle || 'Product Title'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {product.category || 'Not specified'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description || 'Product description will appear here.'}
              </Typography>
              <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                Price: ${product.price.cost || '0.00'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                MRP: ${product.price.mrp || '0.00'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discount: {product.price.discount || '0%'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {product.quantity || '0'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tagline: {product.tagline || 'Product tagline'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <style jsx>{`
        .add-product-container {
          background: linear-gradient(135deg, #000000, #FFD700);
          min-height: 100vh;
          padding: 2rem;
        }

        .page-title {
          margin-bottom: 2rem;
          color: #FFD700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .form-paper {
          padding: 2rem;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        .product-preview {
          position: sticky;
          top: 2rem;
          border-radius: 15px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        .submit-button {
          background-color: #FFD700 !important;
          color: #000000 !important;
          font-weight: bold !important;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          background-color: #FFC400 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 960px) {
          .add-product-container {
            padding: 1rem;
          }

          .form-paper {
            padding: 1rem;
          }

          .product-preview {
            position: static;
            margin-top: 2rem;
          }
        }
      `}</style>
    </Box>
  );
};

export default AddProduct;

