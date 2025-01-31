import { Box, Typography, styled } from '@mui/material';
import { navData } from '../../constants/data';

const Component = styled(Box)(({theme})=>({
    display: 'flex',
    margin: '65px 0px 0px 0px',
    justifyContent: 'space-between',
    overflow: 'overlay',
    background: '#fff',  
    padding: '2px 80px 2px 80px',
    "&::-webkit-scrollbar": {
        display: 'none'
    },
    [theme.breakpoints.down('md')]: {
        margin: '10px 0px 10px 0px'
    }

}));
    


const Container = styled(Box)`
    display: flex;
    flex-direction: column; 
    align-items: center; 
    padding: 12px 12px;
    border: solid;
    border-width: 0px;
    width: 100px;  
    height: 100px;
    border-radius: 50%;
    background-color: #D3D3D3; 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 8px;
`;


const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 8px; /* Add spacing between image and text */
    font-weight: 600;
    font-family: inherit;
`;

const NavBar = () => {
    return (
        <Component>
            {navData.map((data, index) => (
                <div style={{ marginTop: '0px' }}>
                <Container key={index}>
                   <img
                        src={data.url}
                        alt="nav"
                        style={{
                            width: '100px',
                            height: '100px'   // Makes the image circular
                        }}
                    />
                   
                </Container>
                 <Text style={{ textAlign: 'center' }}>{data.text}</Text>
                 </div>
            ))}
        </Component>
    );
};

export default NavBar;
