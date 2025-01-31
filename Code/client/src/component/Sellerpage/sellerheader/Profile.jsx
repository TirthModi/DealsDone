import { useState } from 'react';
import {Box,Typography,Menu,MenuItem,styled} from '@mui/material'

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Component = styled(Menu)`
    margin-top:5px;
`;

const B = styled(Box)`
margin-right:20px;
cursor:pointer;
`;

const Logout = styled(Typography)`
    font-size:14px;
    margin-left:20px;
`;



const Profile = ({account,setAccount})=>{

    const [open,setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = (event) =>{
        setOpen(event.currentTarget);
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    const logoutUser =()=>{
        Cookies.remove('token');
        setAccount('');
        navigate('/')
    }

    return (
    <B>
        <box onClick={handleClick}><Typography styled ={{marginTop : 2 , cursor:'pointer'}}>{account}</Typography></box>
        <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        
      >
        
        <MenuItem onClick= {() => {handleClose(); logoutUser();}}>
        <PowerSettingsNewIcon color="primary" fontsize="small"/>
        <Logout>Logout</Logout></MenuItem>
      </Component>
    </B>
    )
}

export default Profile;