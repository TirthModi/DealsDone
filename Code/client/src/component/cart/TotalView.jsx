import { Typography, Box, styled } from "@mui/material";
import { useEffect, useState } from "react";

const Heading = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const HeadingText = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
    & > h6 {
        margin-bottom: 20px;
    }
`;

const Discount = styled(Typography)`
    color: green;
    font-weight: 500;
`;

const Price = styled(Box)`
    float: right;
`;

let totalPrice = 0; // Declare totalPrice outside the component for exporting

const TotalView = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [cartItems]);

    const totalAmount = () => {
        let price = 0,
            discount = 0;
        cartItems.forEach((item) => {
            price += item.price.mrp;
            discount += item.price.mrp - item.price.cost;
        });
        setPrice(price);
        setDiscount(discount);
        totalPrice = price - discount + 40; // Update totalPrice dynamically
    };

    return (
        <Box>
            <Heading>
                <HeadingText>PRICE DETAILS</HeadingText>
            </Heading>
            <Container>
                <Typography>
                    Price ({cartItems?.length} item)
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>
                    Discount
                    <Price component="span">-₹{discount}</Price>
                </Typography>
                <Typography>
                    Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>
                <Typography variant="h6">
                    Total Amount
                    <Price component="span">₹{price - discount + 40}</Price>
                </Typography>
                <Discount>
                    You will save ₹{discount > 40 ? discount - 40 : discount} on this
                    order
                </Discount>
            </Container>
        </Box>
    );
};

export { totalPrice };
export default TotalView;
