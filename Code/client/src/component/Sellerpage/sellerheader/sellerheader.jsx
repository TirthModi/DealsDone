import {AppBar,Box, IconButton, Toolbar, Drawer, List, styled} from '@mui/material';
import img1 from './logo.png'
import CustomButtons from './Custombuttons';
import {Link} from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';

const StyleHeader = styled(AppBar)`
    background: #051922;
    height: 65px;
    box-shadow: none;
`;


const Component = styled(Link)`
    margin-left: 2%;
    line-height: 0;
    text-decoration: none;
    color : inherit;
`;

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 1% 0 auto', 
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const Header = () => {
    
    const [open, setOpen] = useState(false);

    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const list = () => (
        <Box style={{ width: 200 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );

    return (
    <StyleHeader>
        <Toolbar style={{minHeight:55}}>
            <MenuButton color="inherit" onClick={handleOpen}>
                <Menu/>
            </MenuButton>

            <Drawer open={open} onClose={handleClose} PaperProps={{
                        sx: {
                            backgroundColor: '#051922',
                        },
                    }}
            >
                {list()}
            </Drawer>

            <Component to='/'>
                <img src={img1} alt="DealsDone" style={{height:220,width:230}}/>
                    
            </Component>
            <CustomButtonWrapper>
                <CustomButtons />
            </CustomButtonWrapper>
        </Toolbar>
    </StyleHeader>
    )
}

export default Header;