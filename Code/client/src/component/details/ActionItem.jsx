import { Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adddToCart } from "../../redux/actions/cartActions";
import { useState } from "react";

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px',
        textAlign: 'center' 
    },

    [theme.breakpoints.down('sm')]: {
        padding: '20px 40px',
        textAlign: 'center' 
    }
}))

const Image = styled('img')({
    width: '95%', 
    padding : '15px'
});

const StyledButton = styled(Button) (({theme}) => ({
    width : '48%',
    height: 50,
    borderRadius : 2,
    [theme.breakpoints.down('lg')]:{
        width : '46%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%',
        
    }
    
}));
    


const ActionItem =({product}) =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qunatity, setQuantity] = useState(1);
    const { id } = product;
    const addItemToCart =() =>{
        dispatch(adddToCart(id, qunatity));
        navigate('/cart');
    }
    return (
        <LeftContainer>
            <Box style = {{padding : '10px 10px 10px 10px', margin: '0px 10px 10px 0px', border : '1px solid #000000'}}>
                <Image src={product.detailUrl}/>
            </Box>
            <StyledButton variant="contained" onClick={()=>addItemToCart()} style={{marginRight:10, background:'#ff9f00'}}>Add to Cart</StyledButton>
            <StyledButton variant="contained" onClick={() => navigate('/checkout')} style={{ background:'#fb541b'}} >BUY NOW</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;