import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {

    //****     Material UI - password field     *****//
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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
    const [username, setUsername] = useState();
    const [usernameError, setUsernameError] = useState();


    return (
        <div className='login-comp'>
            <main>
                <div className='login-form-container'>
                    <h1 className='main-title'>Login</h1>
                    <form>
                        <TextField
                            error={username === ""}
                            id="outlined-error-helper-text"
                            label="Username"
                            defaultValue=""
                            helperText="Incorrect entry."
                            onChange={event => {
                                setUsername(event.target.value);
                            }}
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                error={values.password === ""}
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
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
                        </FormControl>
                    </form>
                </div>
            </main>

            <aside>
                <div className='bg-right-container'>
                    <div className='big-word-bg'>Find</div>
                    <div className='big-word-bg'>Share</div>
                    <div className='big-word-bg'>Cook</div>
                    <div className='big-word-bg'>Taste!</div>
                </div>
            </aside>

        </div>
    )
}
