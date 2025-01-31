import Header from '../home/header/Header'
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, Typography, styled, Grid, colors } from '@mui/material';
import ActionItem  from './ActionItem';
import ProductDetail from "./ProductDetail";

const Component = styled(Box)`
    background: #F2F2F2;
    margin-op : 55px;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)(({ theme }) => ({
    margin: '50px 0px 0px 0px',
     
    "& > p": {
        marginTop: '10px',
    },

    [theme.breakpoints.down('md')]: {
        margin: '20px 0px 0px 10px',
    }
}));

    

const DetailView= () =>{
    

    const { id } = useParams();
    const dispatch = useDispatch();

    const { loading, product } = useSelector(state => state.getProductDetails);

    useEffect(() => {   
        if(product && id !== product.id)
            dispatch(getProductDetails(id))
    }, [dispatch, id, product, loading])

    console.log(product);

    return(
        <div>
            <Header />
            <Component>
                {
                    
                    product && Object.keys(product).length && 
                    <Grid container>
                        <Grid item lg = {4} md={4} sm={8} xs={12}> 
                            <ActionItem product = {product} />
                        </Grid>
                        <RightContainer item lg = {8} md={8} sm={8} xs={12}> 
                            <ProductDetail product = {product}/>
                        </RightContainer>
                    </Grid>   
                }
            </Component>
        </div>
    )
}

export default DetailView;