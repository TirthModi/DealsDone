import { useState } from 'react';
import { Box, Typography, Menu, MenuItem, styled, Button } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const B = styled(Box)`
    margin-right: 20px;
    cursor: pointer;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;

const Name = styled(Button)`
    background-color: #051922;
    color: #FFA500;
    text-transform: none;
    padding: 5px 7px;
    border-radius: 2px;
    box-shadow: none;
    height: 32px;
    justify-content: center;
`;

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const logoutUser = () => {
        setAccount('');
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/profilepage');  
        handleClose();
    };

    return (
        <B>
            <Box onClick={handleClick}>
                <Name  style={{ fontSize: 16 }}>{account}</Name>
            </Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                {/* Profile Button */}
                <MenuItem onClick={goToProfile}>
                    <AccountCircleIcon color="primary" fontSize="small" />
                    <Logout>Profile</Logout>
                </MenuItem>

                {/* Logout Button */}
                <MenuItem onClick={() => { handleClose(); logoutUser(); }}>
                    <PowerSettingsNewIcon color="primary" fontSize="small" />
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </B>
    );
};

export default Profile;
