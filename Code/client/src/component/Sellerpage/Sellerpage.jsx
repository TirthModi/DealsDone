import React, { useContext, useState, useEffect } from 'react';
import { Button, Typography, Box, Card, CardContent, Grid, styled, Fade, Slide } from '@mui/material';
import Header from './sellerheader/sellerheader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import './SellerPage.css';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import LoginDialog from '../login/LoginDialog';
import Carousel from 'react-material-ui-carousel';

const DealText = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 500,
  lineHeight: '32px',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginBottom: '40px',
  marginTop: '40px',
  color: 'orange',
  textAlign: 'center',
}));

const AnimatedBox = styled(Box)(({ theme }) => ({
  transition: 'opacity 0.5s, transform 0.5s',
  opacity: 0,
  transform: 'translateY(20px)',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

function SellerPage() {
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleAddProduct = () => {
    if (account) {
      navigate('/add-product');
    } else {
      setOpen(true);
    }
  };

  const sellerStories = [
    {
      name: "Ram Kumar",
      story: "I started selling on DealsDone last year and my sales have tripled!",
      image: "https://img.freepik.com/free-photo/worldface-pakistani-guy-white-background_53876-14466.jpg"
    },
    {
      name: "Deepak Sharma",
      story: "DealsDone's seller support has been incredible in growing my business.",
      image: "https://img.freepik.com/premium-photo/indian-male-model_928503-1124.jpg"
    },
    {
      name: "Dev Patel",
      story: "The wide customer base on DealsDone has helped me reach new markets.",
      image: "https://img.freepik.com/premium-photo/close-up-portrait-photo-beautiful-modern-indian-male-model_928503-2147.jpg"
    }
  ];

  return (
    <div>
      <Header />
      <Fade in={loaded} timeout={1000}>
        <Box className="hero-section" sx={{ textAlign: 'center', padding: 5, backgroundColor: '#f5f5f5' }}>
          <DealText>
            <span style={{ color: '#FFA500' }}>Start</span>{' '}
            <span style={{ color: '#051922' }}>Selling Online with Ease</span>
          </DealText>
          <Typography variant="h6" color="text.secondary" paragraph>
            Reach millions of customers and grow your business with our platform.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={handleAddProduct}
            style={{ backgroundColor: '#FFA500', color: 'white' }}
          >
            Add Product
          </Button>
        </Box>
      </Fade>

      <AnimatedBox sx={{ padding: 5, backgroundColor: '#f0f0f0' }} className={loaded ? 'visible' : ''}>
        <Typography variant="h4" textAlign="center" gutterBottom style={{ color: '#051922', marginBottom: '20px' }}>
          Seller Success Stories
        </Typography>
        <Carousel
          animation="slide"
          interval={5000}
          navButtonsAlwaysVisible
          style={{ maxWidth: '800px', margin: '0 auto', height: '450px' }}
        >
          {sellerStories.map((story, index) => (
            <Card key={index} style={{ padding: '20px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img src={story.image} alt={story.name} style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 30px' }} />
              <Typography variant="h6" gutterBottom style={{ color: '#051922' }}>
                {story.name}
              </Typography>
              <Typography color="text.secondary" style={{ fontSize: '1.2rem' }}>
                "{story.story}"
              </Typography>
            </Card>
          ))}
        </Carousel>
      </AnimatedBox>

      <AnimatedBox sx={{ padding: 5 }} className={loaded ? 'visible' : ''}>
        <Typography variant="h4" textAlign="center" gutterBottom style={{ color: '#051922' }}>
          Why Sell with Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Slide direction="up" in={loaded} timeout={1000}>
              <Card className="feature-card" >
                <CardContent>
                  <ShoppingCartIcon style={{ color: '#FFA500' }} sx={{ fontSize: 50 }} />
                  <Typography variant="h6" gutterBottom style={{ color: '#051922' }}>
                    45 Crore+ Customers
                  </Typography>
                  <Typography color="text.secondary" >
                    Connect with millions of customers nationwide to boost your sales.
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Slide direction="up" in={loaded} timeout={1500}>
              <Card className="feature-card">
                <CardContent>
                  <EnhancedEncryptionIcon style={{ color: '#FFA500' }} sx={{ fontSize: 50 }} />
                  <Typography variant="h6" gutterBottom style={{ color: '#051922' }}>
                    Secure Payments
                  </Typography>
                  <Typography color="text.secondary">
                    Receive secure and timely payments every week without any hassle.
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Slide direction="up" in={loaded} timeout={2000}>
              <Card className="feature-card">
                <CardContent>
                  <SupportAgentIcon style={{ color: '#FFA500' }} sx={{ fontSize: 50 }} />
                  <Typography variant="h6" gutterBottom style={{ color: '#051922' }}>
                    Seller Support
                  </Typography>
                  <Typography color="text.secondary" >
                    Access 24/7 seller support to help you through any challenges.
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </AnimatedBox>

      <Box style={{ backgroundColor: '#051922', padding: 20, textAlign: 'center', color: 'white', marginTop: 95 }}>
        <Typography variant="body1">© 2024 DealsDone | All rights reserved.</Typography>
      </Box>

      <LoginDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default SellerPage;

