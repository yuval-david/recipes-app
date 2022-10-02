import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default function Login() {

    //****     Material UI - password field     *****//
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const numbers = []


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        if (prop == "password") {
            setPass(event.target.value);
            setOneTryTap(true);
            setPassError("");
        }
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // **************************************** //

    // States - form fields
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passError, setPassError] = useState("");
    const [oneTryTap, setOneTryTap] = useState(false); //password
    const [oneTryTapUsername, setOneTryTapUsername] = useState(false); //username
    const [isLogged, setIsLogged] = useState(false);

    let navigate = useNavigate();

    const sendForm = () => {
        console.log('senForm function called');

        // Validation Login Form - Front
        if (username.length < 1) {
            setUsernameError("The username is missing.");
            setUsername("");
            setOneTryTapUsername(true);
        }
        if (pass.length < 1) {
            setPassError("Password is missing.");
            setPass("");
            setOneTryTap(true);
        }
        // If there is USER & PASSWORD => send LOGIN POST request
        if (username.length > 0 && pass.length > 0) {
            fetch("http://localhost:1000/users/login", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, pass })
            })
                .then(details => details.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem("token", data.token);
                    navigate("/home");
                })
                .catch((err) => {
                    console.log(err);
                })
            setOneTryTapUsername(true);
        }
    };


    useEffect(() => {
        let loginStatus = localStorage.getItem("token");
        setIsLogged(loginStatus);
    }, []);


    return (
        <div className='login-comp'>
            <main>
                <div className='login-form-container'>
                    <h1 className='main-title'>Login</h1>
                    <Link className='link-register' to="register">Don't have an account yet? Click here to register</Link>
                    <form>
                        <TextField
                            error={username.length == 0 && oneTryTapUsername}
                            id="outlined-error-helper-text"
                            label="Username"
                            defaultValue=""
                            helperText={usernameError}
                            onChange={event => {
                                setOneTryTapUsername(true);
                                setUsername(event.target.value);
                                setUsernameError("");
                            }}
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                error={pass === "" && oneTryTap}
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={
                                    handleChange('password')
                                }
                                helpertext={passError}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <label className='error-password'>{passError ? passError : ""}</label>
                        </FormControl>

                        <Button onClick={sendForm} variant="contained">Submit</Button>
                    </form>
                </div>
            </main>

            <aside>
                <div className='bg-right-container'>
                    <div data-aos="fade-right" data-aos-duration="1000" className='big-word-bg'>Find</div>
                    <div data-aos="fade-right" data-aos-delay="1000" data-aos-duration="700" className='big-word-bg'>Share</div>
                    <div data-aos="fade-right" data-aos-delay="2000" data-aos-duration="700" className='big-word-bg'>Cook</div>
                    <div data-aos="fade-right" data-aos-delay="3000" data-aos-duration="700" className='big-word-bg'>Taste!</div>
                </div>
            </aside>


            {isLogged ? <Navigate to="/home" /> : ""}

        </div>
    )
}
