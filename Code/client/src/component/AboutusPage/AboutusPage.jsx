import React, { useState } from "react";
import { 
  Container, Typography, Grid, Box, Card, CardContent, 
  Accordion, AccordionSummary, AccordionDetails, useTheme 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from "framer-motion";

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(4),
}));

const HighlightSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledImage = styled('img')({
  width: '100%',
  height: 200,
  objectFit: 'cover',
});

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:before': {
    display: 'none',
  },
}));

const AboutUs = () => {
  const theme = useTheme();
  const [expandedFaq, setExpandedFaq] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <StyledContainer maxWidth="lg">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom>
            Welcome to <HighlightSpan>DealsDone</HighlightSpan>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Discover the perfect place for buyers and sellers to thrive!
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div variants={fadeInUp}>
            <Typography variant="h4" gutterBottom>
              Who We Are
            </Typography>
            <Typography variant="body1" color="textSecondary">
              At <b>DealsDone</b>, we aim to create a seamless shopping
              experience for buyers and sellers alike. Our platform showcases a
              diverse range of products sourced from passionate sellers who value
              quality and customer satisfaction.
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div variants={fadeInUp}>
            <StyledImage
              src="https://media.licdn.com/dms/image/D4D12AQFjY_qoFYh7RQ/article-cover_image-shrink_720_1280/0/1696425320324?e=2147483647&v=beta&t=-NsmL_VB5IKNExWIMU4E5BLKLQjHTSsuo1yV4pC7Eto"
              alt="Who We Are"
            />
          </motion.div>
        </Grid>
      </Grid>

      <Box my={6}>
        <motion.div variants={fadeInUp}>
          <Typography variant="h4" gutterBottom>
            What We Offer
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {[
            {
              title: "Diverse Products",
              description: "Browse a wide range of items to suit your needs.",
              image: "https://geti.id/wp-content/uploads/2023/08/1684731929210-1.png",
            },
            {
              title: "Secure Shopping",
              description: "Enjoy a safe shopping experience with reliable payment methods.",
              image: "https://wpactivethemes.com/wp-content/uploads/2022/09/Why-is-multi-vendor-marketplace-solution-the-best-idea-for-eCommerce-business.png",
            },
            {
              title: "Exceptional Support",
              description: "We're here to help you every step of the way.",
              image: "https://www.agilitypr.com/wp-content/uploads/2021/05/reviews.jpg",
            },
          ].map((offer, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div variants={fadeInUp}>
                <StyledCard>
                  <StyledImage src={offer.image} alt={offer.title} />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {offer.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {offer.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box textAlign="center" my={6}>
        <motion.div variants={fadeInUp}>
          <Typography variant="h4" gutterBottom>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={4}>
            We're committed to providing the best experience for buyers and sellers.
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {[
            "Verified Sellers",
            "Community-Driven",
            "Modern Platform",
            "Customer Focused",
          ].map((reason, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {reason}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box my={6}>
        <motion.div variants={fadeInUp}>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
        </motion.div>
        {[
          {
            question: "What is DealsDone?",
            answer: "DealsDone is an online marketplace that connects buyers and sellers, providing a seamless and secure shopping experience."
          },
          {
            question: "How do I become a seller on DealsDone?",
            answer: "To become a seller, sign up on our platform, get verified, and start listing your products to reach a wider audience."
          },
          {
            question: "How can I make a purchase?",
            answer: "Simply browse through the products, add them to your cart, and proceed to checkout to complete the purchase with a secure payment method."
          },
          {
            question: "Is my personal information secure?",
            answer: "Yes, we use secure encryption methods to protect your personal and payment details to ensure your safety while shopping on DealsDone."
          }
        ].map((faq, index) => (
          <StyledAccordion
            key={index}
            expanded={expandedFaq === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AnimatePresence>
                {expandedFaq === `panel${index}` && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Typography>{faq.answer}</Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </StyledContainer>
  );
};

export default AboutUs;

