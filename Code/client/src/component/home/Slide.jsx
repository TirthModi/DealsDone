import { Button, Box, Typography, styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import {Link} from 'react-router-dom';
import shadows from '@mui/material/styles/shadows';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Component = styled(Box)`
    margin-top: 10px;
   // background: red;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: auto ;
    margin-left: auto ;
    color: orange;
    text-align: center;
`

const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const ViewAllButton = styled(Button)`
    // margin-left: auto;
    background-color: #FFA500;
    border-radius: 2px;
    font-size: 13px;
`;

const Image = styled('img')({
    width: 150,
    height: 150
})

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`

      
const Slide = ({ products, timer, title }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return <box variant="span">{hours} : {minutes} : {seconds}  Left</box>;
    };
    
    return (
        <Component>
            <Deal style={{background: 'white'}}>
            <DealText>
                    <span style={{ color: 'orange' }}>{title.split(' ')[0]}</span>{' '}
                    <span style={{ color: 'black' }}>{title.split(' ').slice(1).join(' ')}</span>
            </DealText>
                {
                    timer && <Timer>
                                <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                                <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Timer>
                }
                <ViewAllButton
                        variant="contained"
                        color=""
                        sx={{ color: "white" }}
                        >
                        View All
                </ViewAllButton>

            </Deal>
        
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                centerMode={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                style={{ backgroundColor: '#FF5A00' }}
            >
                {
                    products.map(product => (
                            
        
                            <Link to={`product/${product.id}`} style={{textDecoration: 'none'}}>
                                <Box textAlign="center"  
                                style={{
                                padding: '25px 15px',
                                margin: '10px 0 1px 10px',
                                border: '1px solid grey',  
                                borderRadius: '8px' ,
                                backgroundColor: 'white',
                                shadows: '1px 1px 1px 1px'
                                }}>
                                    <Image src={product.url}  alt="product" />
                                    <Text style={{ fontWeight: 600, color: '#212121', whiteSpace: 'nowrap' }}>{product.title.shortTitle}</Text>
                                    <Text style={{ color: 'green' }}>{product.discount}</Text>
                                    <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>
                                </Box>
                            </Link>
                    ))
                }
            </Carousel>
        </Component>
    )
}

export default Slide;
