import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload = ({ onUpload, error }) => {
  const handleFileChange = (e) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Images
        </Button>
      </label>
      {error && (
        <Typography color="error" variant="caption" display="block">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;

