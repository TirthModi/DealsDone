import React, { useState, useEffect } from 'react';
import { Typography, Box, styled, Table, TableBody, TableRow, TableCell, TextField, Rating, Button, Paper, Divider } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';
import { submitReview, getReviewsByProductId  } from '../../service/api';
import { useNavigate } from 'react-router-dom';


const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`;

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
        border : none;
    }
`;

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;


const ProductDetail = ({ product }) => {

    
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    const reviewData = {
        productId: product.id,
        rating: rating,
        reviewText: review,
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
        console.log(reviewData)
    };

    const handleReviewChange = (event) => {
        const { name, value } = event.target;

        setReview(value);

        console.log(reviewData)
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviewsByProductId(product.id);
                setReviews(response); 
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (product.id) {
            fetchReviews();
        }
    }, [product.id]);

    const onSubmitReview = async (e) => {
        e.preventDefault();


        console.log('Review details submitted:', reviewData);

        const response = await submitReview(reviewData);

        if (!response) return;

        setReviews((prevReviews) => [...prevReviews, response]);
        navigate('./');
    };

    

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));

    return (
        <>
            <Typography> {product.title.longTitle} </Typography>
            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}> 
                8 rating & 1 review
            </Typography>
            <Typography>
                <Box component="span" style={{ fontSize: 28 }}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp; 
                <Box component="span" style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ color: '#388E3C' }}>{product.price.discount} off</Box>
            </Typography>

            <Typography>Available offers</Typography>
            <SmallText>
                <Typography><StyledBadge />Get extra 20 % off upto ₹50 on 1 item(s) T&C </Typography>
                <Typography><StyledBadge />Geyty extra 13% off(price inclusive of discount) T&C</Typography>
                <Typography><StyledBadge />Sign up for DealsDone pay later and get DealsDone Gift card worth ₹100 * Know More</Typography>
                <Typography><StyledBadge />Buy 2 items save 5%;Buy 3 or more save more 10% T&C</Typography>
                <Typography><StyledBadge />5% off on Axis Bank Card</Typography>
                <Typography><StyledBadge />No cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999 T&C</Typography>
            </SmallText>

            <Table>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell> No warranty</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <Box component="span" style={{ color: '#2874f0' }}>SupercomNet </Box>
                            <Typography>GST invoice available</Typography>
                            <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
                        </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell colSpan={2}>
                            <img src={adURL} style={{ width: 390 }} alt="DealsDonepoints" />
                        </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </ColumnText>
                </TableBody>
            </Table>

            {/* Rating and Review Section */}
            <Typography variant="h6" style={{ marginTop: 20 }}>Rate this Product</Typography>
            <Rating
                name="product-rating"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5}
            />
            <TextField
                label="Write your review"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                style={{ marginTop: 10 }}
                value={review}
                onChange={handleReviewChange}
            />
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 10 }}
                onClick={onSubmitReview}
            >
                Submit Review
            </Button>

            <Typography variant="h6" style={{ marginTop: 30 }}>
                Previous Reviews
                </Typography>
                {reviews.length > 0 ? (
                    reviews
                    .slice() // Create a copy to avoid mutating the original array
                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort by date descending
                    .map((reviewItem, index) => (
                        <Paper key={index} style={{ padding: 15, marginBottom: 20 }}>
                            <Box display="flex" alignItems="center">
                                <Rating name="read-only" value={reviewItem.rating} readOnly />
                                <Typography
                                    variant="body2"
                                    style={{ marginLeft: 10, color: '#878787' }}
                                >
                                    {new Date(reviewItem.updatedAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Typography variant="body1" style={{ marginTop: 10 }}>
                                {reviewItem.reviewText}
                            </Typography>
                        </Paper>
                    ))
                ) : (
                    <Typography>No reviews yet.</Typography>
            )}
            </>
        );
};

export default ProductDetail;