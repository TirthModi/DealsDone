import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, Typography, Box, Container, styled } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  textAlign: 'center',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  margin: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
}));

const PaymentDecision = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleShowSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          transactionId: Math.random().toString(36).substr(2, 9),
        }
      });
    }, 1500);  // Delay to show success message before redirecting
  };

  const handleHideSuccess = () => {
    setShowSuccessMessage(false);
    navigate('/payment-fail');
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledCard>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#2e7d32', mt: 2, mb: 4 }}>
              Confirm Your Payment
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography variant="body1" color="textSecondary" paragraph>
              Would you like to proceed with the payment?
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <StyledButton 
              variant="contained" 
              color="primary"
              onClick={handleShowSuccess}
              startIcon={<CheckCircle />}
            >
              Confirm Payment
            </StyledButton>
            <StyledButton 
              variant="outlined" 
              color="secondary"
              onClick={handleHideSuccess}
              startIcon={<XCircle />}
            >
              Cancel Payment
            </StyledButton>
          </Box>

          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mt: 4, 
                  color: '#2e7d32', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CheckCircle sx={{ mr: 1 }} /> Payment Successful! Thank you for your purchase.
              </Typography>
            </motion.div>
          )}
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default PaymentDecision;

