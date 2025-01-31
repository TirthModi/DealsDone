import { Button, Dialog, TextField, Typography, styled, Box, IconButton, InputAdornment } from "@mui/material";
import PasswordChecklist from 'react-password-checklist';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import MuiPhoneNumber from 'material-ui-phone-number';

import { useState, useContext } from "react";

import logo from '../home/header/logo.png'
import { authenticateSignup, authenticateLogin,authenticateForgotPassword,authenticateVerifyOtp} from "../../service/api";

import { DataContext } from "../../context/DataProvider";

import Cookies from 'js-cookie';

const Component = styled(Box)`
  height: 90vh;
  width: 50vw;   
`;

const Image = styled(Box)`
    background: #051922 url(${logo}) no-repeat left 100%;
    height: auto;
    background-size: 90%;
    width: 32%;
    padding: 35px 25px;
    & > p , & > h5 {
        color: #ffffff;
        font-weight: 600;
    }
`;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div , & > button , & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background-color: #FFA500;
    color: #ffffff;
    height: 48px;
    border-radius: 4px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background-color: #f3e84e;
    color: #a70f0f;
    height: 48px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    font-size: 12px;
    color: #878785;
`;

const CreateAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #a70f0f;
    font-weight: 600;
    cursor: pointer;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color:#ff6161;
    line-height:0;
    margin-top: 10px;
    font-weight:600;
`;

const accountInitialValue = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Start buying with the best deals and the newest products'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: 'Sign up with your mobile number to get started'
    },
    email: {
        view: 'email',
        heading: 'Forgot Password',
        subHeading: 'Enter your email to receive the OTP'
    },
    otp: {
        view: 'otp',
        heading: 'Enter OTP',
        subHeading: 'We have sent an OTP to your email and New Password'
    }
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const loginInitialValues = {
    username: localStorage.getItem('username') || '',
    password: ''   
};
const emailInitialValue = {
    email: '',
    otp: '',
    password: ''
}

const LoginDialog = ({ open, setOpen }) => {
    const [account, toggleAccount] = useState(accountInitialValue.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(false);
    const [validemail, setvalidemail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState(false);
    const [email, setEmail] = useState(emailInitialValue);


    const { setAccount } = useContext(DataContext);

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValue.login);
        setSignup(signupInitialValues);
        setError(false);
        setvalidemail(false);
        setShowPassword(false);
        setPasswordEntered(false);
        setEmail(emailInitialValue);
    };

    const handleKeyDown = (e) => {
        if (!["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key) && !/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const toggleSignup = () => {
        toggleAccount(accountInitialValue.signup);
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email' && !validateEmail(value)) {
            setvalidemail('Please enter a valid email address');
        } else {
            setvalidemail(false); // Clear error if email is valid
        }
        if (name === 'password') {
            if (value) {
                setPasswordEntered(true); 
            } else {
                setPasswordEntered(false); 
            }
        }
        
        setSignup({ ...signup, [e.target.name]: e.target.value });
        console.log("Updated signup data:", signup);
    };
    const onEmailChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email' && !validateEmail(value)) {
            setvalidemail('Please enter a valid email address');
        } else {
            setvalidemail(false); // Clear error if email is valid
        }
        
        setEmail({ ...email, [e.target.name]: e.target.value });
        console.log("Updated Email data:", email);
    };


    // const onValueChange = (e)=>{
    //     setLogin({...login,[e.target.name]: e.target.value});
    
    //     const name = e.target.value;
    //     console.log(name);
        
    //         localStorage.setItem('username', name); // Save username to localStorage
        
    // };
    const onValueChange = (e) => {
        const { name, value } = e.target;
        
        
        setLogin({ ...login, [name]: value });
    
       
        if (name === 'username') {
            localStorage.setItem('username', value); // Save username to localStorage
        }
        console.log("Updated login data:", login);
    };
    

    const validateSignupFields = (signup) => {
        const errors = {};
    
        if (!signup.firstname.trim()) {
            errors.firstname = "Error: First name is required.";
        } else if (!/^[a-zA-Z]+$/.test(signup.firstname)) {
            errors.firstname = "Error: First name must contain only alphabetic characters.";
        }
    
        if (!signup.lastname.trim()) {
            errors.lastname = "Error: Last name is required.";
        } else if (!/^[a-zA-Z]+$/.test(signup.lastname)) {
            errors.lastname = "Error: Last name must contain only alphabetic characters.";
        }
    
        if (!signup.username.trim()) {
            errors.username = "Error: Username is required.";
        } else if (!/^[a-zA-Z0-9]+$/.test(signup.username)) {
            errors.username = "Error: Username must be alphanumeric.";
        }
    
        if (!signup.email.trim()) {
            errors.email = "Error: Email is required.";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(signup.email)) {
            errors.email = "Error: Invalid email format.";
        }
    
        if (!signup.password) {
            errors.password = "Error: Password is required.";
        } else {
            const rules = [
                { regex: /^.{8,}$/, message: "Error: Password must be at least 8 characters long." },
                { regex: /[a-z]/, message: "Error: Password must contain at least one lowercase letter." },
                { regex: /[A-Z]/, message: "Error: Password must contain at least one uppercase letter." },
                { regex: /[0-9]/, message: "Error: Password must contain at least one number." },
                { regex: /[\W_]/, message: "Error: Password must contain at least one special character." },
            ];
    
            rules.forEach((rule) => {
                if (!rule.regex.test(signup.password)) {
                    errors.password = rule.message;
                }
            });
        }
    
        if (!signup.phone.trim()) {
            errors.phone = "Error: Phone number is required.";
        } else if (!/^\+91\s\d{5}-\d{5}$/.test(signup.phone)) {
            errors.phone = "Error: Invalid phone number";
        }
    
        return errors;
    };

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        const token =response.data.token;
        console.log(token);
        if (response.status === 200) {
            handleClose();
            setAccount(response.data.user.firstname);
        }
        else {
            setError(true);
        }
    };
    

    
    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        const errors = validateSignupFields(signup);
        if (Object.keys(errors).length > 0) {
            alert(Object.values(errors).join("\n"));
            console.error("Validation Errors:", errors);
            return;
        }
        else{
        if (!response) return;
        handleClose();
        console.log(response);
        setAccount(signup.firstname);
        }
    };
    
    
    const handleSendOtp = async() => {
        let response  = await authenticateForgotPassword(email);

       if(!response){
        alert('Please enter valid email address');
       }
       else{
        toggleAccount(accountInitialValue.otp);
       }
    };
    
    const handleResetPassword = async() => {
        let response = await authenticateVerifyOtp(email);
        if(!response){
            alert('Please enter valid otp');
        }
        else{
            alert('Password reset successfully');
            handleClose();
        }  
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };


    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image>
                        <Typography variant="h5" style={{color: '#ffa500'}}>{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Image>
                    {account.view === 'login' ? (
                        <Wrapper>
                            <TextField label="Enter Username" onChange={(e) => onValueChange(e)} name="username" variant="outlined" />
                            {error && <Error>Pleasr Enter valid username or Password</Error>}

                            <TextField label="Enter Password" onChange={(e) => onValueChange(e)} name="password" variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Text>By continuing, you agree to DealsDone's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}>OR</Typography>
                            <RequestOTP onClick={() => toggleAccount(accountInitialValue.email)}>Forgot Password</RequestOTP>
                            <CreateAccount onClick={toggleSignup} style={{marginTop: 'auto'}}>New to DealsDone? Let's create an account</CreateAccount>
                        </Wrapper>
                    ) : account.view === 'signup'?(
                        <Wrapper>
                            <TextField label="Enter Firstname" onChange={(e) => onInputChange(e)} name="firstname" variant="outlined" />
                            <TextField label="Enter Lastname" onChange={(e) => onInputChange(e)} name="lastname" variant="outlined" />
                            <TextField label="Enter Username" onChange={(e) => onInputChange(e)} name="username" variant="outlined" />

                            <TextField label="Enter Email" onChange={(e) => onInputChange(e)} name="email" variant="outlined" />
                            {validemail && <Error>{validemail}</Error>}

                            <TextField label="Enter Password" onChange={(e) => onInputChange(e)} value={signup.password} name="password" variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            { passwordEntered && <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                                minLength={8}
                                value={signup.password}
                            />
                            }
                            <MuiPhoneNumber defaultCountry={'in'}
                                label="Enter PhoneNo"
                                value={signup.phone}
                                onChange={(value) => setSignup({ ...signup, phone: value })} 
                                onKeyDown={handleKeyDown}
                                name="phone"
                                variant="outlined" />
                           
                            <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                        </Wrapper>
                    ) : account.view === 'email' ? (
                        <Wrapper>
                            <TextField label="Enter Email" onChange={(e) => onEmailChange(e)} name="email" variant="outlined" />
                            {validemail && <Error>{validemail}</Error>}
                            <LoginButton onClick={() => handleSendOtp()}>Send OTP</LoginButton>
                        </Wrapper>
                    ) : (
                        <Wrapper>
                            <TextField label="Enter OTP" onChange={(e) => setEmail({...email,[e.target.name]: e.target.value })} name="otp" variant="outlined" />
                            <TextField label="Enter New Password" onChange={(e) => setEmail({...email,[e.target.name]: e.target.value })} value = {email.password} name="password" variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                                minLength={8}
                                value={email.password}
                            />
                            <LoginButton onClick={() => handleResetPassword()}>Reset Password</LoginButton>     
                        </Wrapper>
                    )}
                </Box>
            </Component>
        </Dialog>
    );
};

export default LoginDialog;
