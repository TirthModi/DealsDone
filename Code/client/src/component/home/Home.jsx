import { useEffect } from 'react';
//Component for Home page
import Header from './header/Header';
import NavBar from './NavBar';
import Banner from './Banner';
import Slide from './Slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection';

import {styled,Box} from '@mui/material';
import { getProducts } from '../../redux/actions/productActions';
import { useDispatch,useSelector } from 'react-redux';
import BoxSlide from './BoxSlide';


const Component = styled(Box)
`
    padding: 15px 10px;
    background: #f2f2f2;
`;


const Home = () => {

    const {products}=useSelector(state => state.getProducts);

    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <>
            <Header />
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} title="Deals of the Day" timer={true}/>
                <MidSection/>
                <Slide products={products} title="Discounts for You" timer={false}/>
                <Slide products={products} title="Suggesting Items" timer={false}/>
                <Slide products={products} title="Top Selection" timer={false}/>
                <MidSection/>
                <Slide products={products} title="Recommended Items" timer={false}/>
                <Slide products={products} title="Trending Offers" timer={false}/>
                <BoxSlide />
                <Slide products={products} title="Season's Top Picks" timer={false}/>
                <Slide products={products} title="Top Deals on Accessories" timer={false}/>
                
            </Component>
        </>

    
    )
};

export default Home;