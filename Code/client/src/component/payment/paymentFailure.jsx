import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, Typography, Box, Container, styled } from '@mui/material';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
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
  marginTop: theme.spacing(3),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
}));

const PaymentFail = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledCard>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircle size={80} color="#e53e3e" style={{ margin: '0 auto 24px' }} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#e53e3e', mb: 2 }}>
              Payment Failed
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Typography variant="body1" color="textSecondary" paragraph>
              Unfortunately, your payment could not be processed. Please try again later or contact our support team for assistance.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <StyledButton 
              variant="contained" 
              color="primary"
              onClick={handleBackToHome}
              startIcon={<ArrowLeft />}
            >
              Back to Home
            </StyledButton>
          </motion.div>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default PaymentFail;