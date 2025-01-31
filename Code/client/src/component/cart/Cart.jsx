import { Box, Grid, Typography, styled, Button} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../home/header/Header'
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";

const Container = styled(Grid)(({theme}) =>({
    padding: '30px 135px',
    [theme.breakpoints.down('md')]: {
       padding: '15px 0'
    }
}))
const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`
const CHeader = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`
const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    width: 250px;
    height: 50px;
    border-radius: 2px;

`

const LeftComponent = styled(Grid)(({theme}) =>({
    paddingRight: 10,
    [theme.breakpoints.down('md')]: {
        marginBottom: 15
    }
}));


const Cart = () => {
    const {cartItems} = useSelector(state => state.cart);
    const navigate = useNavigate();
    
    return (
        <>
            <Header />
            {
                cartItems.length?
                <Container container>
                    <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                        <CHeader> 
                            <Typography> 
                                My Cart ({cartItems.length})
                            </Typography>
                        </CHeader> 
                        {
                            cartItems.map(item => (
                                <CartItem item ={item} />

                            ))
                        } 
                        <ButtonWrapper>
                            <StyledButton onClick={() => navigate('/checkout')} >Place Order</StyledButton>
                        </ButtonWrapper>  
                    </LeftComponent>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItems={cartItems} />
                    </Grid>

                </Container> : <EmptyCart />
            }
        </>
        
    )
}

export default Cart;