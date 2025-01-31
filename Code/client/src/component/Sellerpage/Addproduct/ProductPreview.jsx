import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ProductPreview = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.images[0] || '/placeholder.png'}
        alt={product.title.shortTitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title.shortTitle || 'Product Title'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description || 'Product description will appear here.'}
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" component="span">
            ${product.price.cost || '0.00'}
          </Typography>
          {product.price.mrp && product.price.mrp !== product.price.cost && (
            <Typography variant="body2" component="span" sx={{ textDecoration: 'line-through', marginLeft: 1 }}>
              ${product.price.mrp}
            </Typography>
          )}
        </Box>
        {product.colors.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2">Available Colors:</Typography>
            <Box display="flex" mt={1}>
              {product.colors.map((color, index) => (
                <Box
                  key={index}
                  width={20}
                  height={20}
                  bgcolor={color}
                  mr={1}
                  borderRadius="50%"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductPreview;

