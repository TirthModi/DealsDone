import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button, Card, CardContent, Typography, Box, Container, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const transactionId = `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  textAlign: 'center',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
}));

const AnimatedSvg = styled(motion.svg)({
  margin: '0 auto',
  display: 'block',
});

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: theme.spacing(1, 4),
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
}));

const PaymentConfirmation = () => {
  const navigate = useNavigate();

  const tickVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut"
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeInOut"
      }
    }
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledCard>
        <CardContent>
          <AnimatedSvg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              stroke="#4caf50"
              strokeWidth="2"
              fill="none"
              variants={circleVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M7 13l3 3 7-7"
              fill="none"
              stroke="#4caf50"
              strokeWidth="2"
              variants={tickVariants}
              initial="hidden"
              animate="visible"
            />
          </AnimatedSvg>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#2e7d32', mt: 2 }}>
              Payment Successful
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Typography variant="body1" color="textSecondary" paragraph>
              Thank you for your purchase! Your payment was successfully processed.
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
                Transaction ID: {`#${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
            </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </motion.div>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3, pt: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <StyledButton 
              onClick={() => navigate('/')}
              variant="contained"
              color="primary"
              startIcon={<ArrowLeft />}
            >
              Back to Home
            </StyledButton>
          </motion.div>
        </Box>
      </StyledCard>
    </StyledContainer>
  );
};

export default PaymentConfirmation;