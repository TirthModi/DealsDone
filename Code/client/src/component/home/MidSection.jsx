import {  Grid,styled } from '@mui/material';
import { imageURL } from '../../constants/data';


const Wrapper = styled(Grid)`
    margin-top: 10px;
    justify-content: space-between;
`;

const Image = styled('img')(({ theme }) => ({ 
    display: 'flex',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 120
    }
}));

const MidSection = () => {
    return (
        <>
            <Wrapper lg={12} sm={12} md={12} xs={12} container>
                {
                    imageURL.map(image => (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <img src={image} alt="image" style={{ width: '100%' }} />
                        </Grid>
                    ))
                }
            </Wrapper>
          
        </>
    )
}

export default MidSection;