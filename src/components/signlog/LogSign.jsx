import { useState } from 'react'
import '../../css/LogSign.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import imgUrl from '../../../public/icons/shreddedlogoblue.png'
import axios from 'axios';

function Login({ setLoginComponent, setUserObject, setComponent, setPassword, setUsername, username, password}) {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false); //Error states for username and password

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); //Sets username state to the value of the input field
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); //Sets password state to the value of the input field
  };

  const handleLogin = () => { //Handles login button click

    if(username === '') { //Checks if username is empty
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if(password === '') { //Checks if password is empty
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if(username !== '' && password !== '') {
      axios.get(`http://localhost:3000/login?username=${username}&password=${password}`)
      .then((res) => {
        if(res.data === 'NO USER') { //Checks if user exists
          setUsernameError(true);
          setPasswordError(true);
        } else if (res.data.user_id) {
          setUsernameError(false);
          setPasswordError(false);
          setComponent('dashboard');
          setUserObject(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  const handleSignup = () => { //Handles signup button click

    if(username === '') { //Checks if username is empty
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if(password === '') { //Checks if password is empty
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if(username !== '' && password !== '') {
      setLoginComponent('usersetup');
    }
  }

  return (
    <div className="loginWrapper">
      <img src={imgUrl} style={{width:500, height:120}}/>
      <br/>
      <TextField
      id="outlined-basic"
      size="small"
      label="Username"
      {...usernameError ? {error: true, helperText: 'Enter a valid username'} : null}
      onChange={handleUsernameChange} />
      <br/>
      <TextField
      id="outlined-basic"
      size="small"
      label="Password"
      type="password"
      {...passwordError ? {error: true, helperText: 'Enter a valid passsword'} : null}
      onChange={handlePasswordChange} />
      <br/>
      <Button
      variant="outlined"
      sx={{
        mb: 1,
        backgroundColor: "primary.main",
        color: "white",
        '&:hover': {
          backgroundColor: '#fff',
          color: '#3c52b2',
      },
      }}
      onClick={() => handleLogin()}
      >
        <Typography sx={{}}>Login</Typography>
      </Button>
      <Button
      variant="outlined"
      sx={{
        mb: 1,
        backgroundColor: "primary.main",
        color: "white",
        '&:hover': {
          backgroundColor: '#fff',
          color: '#3c52b2',
      },
      }}
      onClick={() => handleSignup()}>
        <Typography>Signup</Typography>
      </Button>
    </div>
  )
}

export default Login
