
import React, { useState, useEffect } from 'react';
import { styled, Container, Grid, Card, Typography, Button, Divider } from '@mui/material';
import { fetchUserProfile } from '../../service/api';

const ProfileContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f7f7f7',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const AvatarImage = styled('img')({
  width: 100,
  height: 100,
  borderRadius: '50%',
  marginBottom: '16px',
  border: '3px solid #3f51b5',
});

const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile(); 
        setUser(data);
        setOrders(data.orders || []);  // Ensure orders is always an array
      } catch (error) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <ProfileContainer maxWidth="sm">
      <Grid container justifyContent="center">
        {/* Profile Section */}
        {user && (
          <Grid item xs={12} sm={10} md={8}>
            <ProfileCard>
              <AvatarImage src={user.avatar || 'https://via.placeholder.com/100'} alt="User Avatar" />
              <Typography variant="h5" component="h2">{`${user.firstname} ${user.lastname}`}</Typography>
              <Typography variant="body2" color="textSecondary">{user.email}</Typography>
              <Typography variant="body2" color="textSecondary">{user.phone}</Typography>
              <Typography variant="body2" color="textSecondary">{user.address}</Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2, borderRadius: '20px' }}>
                Edit Profile
              </Button>
            </ProfileCard>
          </Grid>
        )}

        {/* Order History Section */}
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h6" component="h3" sx={{ marginBottom: 2, fontWeight: 600 }}>Order History</Typography>
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.id}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight="bold">{order.product}</Typography>
                    <Typography variant="body2" color="textSecondary">Date: {order.date}</Typography>
                  </Grid>
                  <Grid item xs={4} container justifyContent="flex-end" direction="column" alignItems="flex-end">
                    <Typography variant="body1" color="textSecondary">{order.price}</Typography>
                    <Typography variant="body2" color={order.status === 'Delivered' ? 'green' : 'orange'}>
                      {order.status}
                    </Typography>
                  </Grid>
                </Grid>
              </OrderCard>
            ))
          ) : (
            <Typography>No orders found.</Typography>
          )}
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default ProfilePage;
