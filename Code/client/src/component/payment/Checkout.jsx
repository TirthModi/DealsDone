import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiInputLabel-root': {
    fontWeight: 600,
  },
  '& .MuiInputBase-input': {
    fontWeight: 500,
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiInputLabel-root': {
    fontWeight: 600,
  },
  '& .MuiSelect-select': {
    fontWeight: 500,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: theme.spacing(1.5, 4),
  fontWeight: 800,
  textTransform: 'none',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Checkout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    deliveryInstructions: '',
  });

  const [deliveryDate, setDeliveryDate] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const calculateDeliveryDate = () => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const deliveryDate = new Date(today.getTime() + randomDays * 24 * 60 * 60 * 1000);
    return deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/payment');
  };

  useEffect(() => {
    setDeliveryDate(calculateDeliveryDate());
  }, []);

  return (
    <StyledContainer maxWidth={false}>
      <StyledCard>
        <StyledCardContent>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <ShoppingBag size={48} color={theme.palette.primary.main} style={{ marginBottom: '16px' }} />
              <StyledTypography variant={isMobile ? "h5" : "h4"} component="h1">
                Checkout
              </StyledTypography>
            </Box>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  fullWidth
                  label="Address Line 1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Address Line 2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledFormControl fullWidth required variant="outlined">
                  <InputLabel id="state-label">State</InputLabel>
                  <Select
                    labelId="state-label"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    label="State"
                  >
                    {indianStates.map((state) => (
                      <MenuItem key={state} value={state}>{state}</MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="PIN Code"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Delivery Instructions"
                  name="deliveryInstructions"
                  multiline
                  rows={4}
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center" style={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                  Expected Delivery Date: {deliveryDate}
                </Typography>
              </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="center">
              <StyledButton
                type="submit"
                variant="contained"
                size="large"
              >
                Proceed to Payment
              </StyledButton>
            </Box>
          </form>
        </StyledCardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default Checkout;

