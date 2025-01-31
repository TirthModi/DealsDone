import React, { useState, useContext } from 'react';
import { Box, Typography, Button, styled, Badge } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { DataContext } from '../../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
// components
import BecomeSeller from '../BecomeSeller/BecomeSeller';
import Profile from './Profile';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '0 3% 0 auto',
    '& > *': {
        marginRight: '40px !important',
        fontSize: 16,
        alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
        display: 'block',
    },
}));



const LoginButton = styled(Button)`
    background-color: #051922;
    color: #FFA500;
    text-transform: none;
     padding: 5px 7px;
    border-radius: 2px;
    box-shadow: none;
    height: 32px;
    justify-content: center;
    white-space: nowrap;
`;

const ListButton = styled(Button)`
    background-color: #051922;
    color: #fff;
    text-transform: none;
     padding: 5px 7px;
    border-radius: 2px;
    box-shadow: none;
    font-weight: 0;
    height: 32px;
    justify-content: center;
    min-width: 150px;
    white-space: nowrap;
`;

const MoreButton = styled(Button)`
    background-color: #051922;
    color: #FFA500;
    text-transform: none;
    padding: 5px 7px;
    border-radius: 2px;
    box-shadow: none;
    height: 32px;
    justify-content: center;
    font-size: 16px;
`;

const AccountIcon = styled(AccountCircleIcon)`
    padding-right: 7px;
    font-size: 28px;
`;

 const MoreIcon = styled(ExpandMoreIcon)`
    padding-left: 5px;
    font-size: 28px;
`;

const ListIcon = styled(BeenhereIcon)`
    padding-right: 7px;
    font-size: 26px;
`

const CustomButtons = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { account, setAccount } = useContext(DataContext);

    const openDialog = () => {
        setOpen(true);
    };

    const handleAddProduct = () => {
        if (account) {
          // Navigate to the Add Product page if the seller is logged in
          navigate('/add-product');
        } else {
          // Open the login dialog if the seller is not logged in
          openDialog();
        }
      };

    return (
        <Wrapper>
            {account ? (
                <Profile account={account} setAccount={setAccount} />
            ) : (
                <LoginButton variant="contained" onClick={openDialog} style={{ fontSize: 16 }}>
                    <AccountIcon />
                    Seller Login
                </LoginButton>
            )}

            <ListButton variant="contained" onClick={handleAddProduct} style={{ fontSize: 16 }}>
                <ListIcon/>
                List Product
            </ListButton>

            <MoreButton variant="contained" style={{ fontSize: 16 }}>
                More
                <MoreIcon />
            </MoreButton>

            
            <BecomeSeller open={open} setOpen={setOpen} />
        </Wrapper>
    );
};

export default CustomButtons;
