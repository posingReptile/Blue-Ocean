import { useState } from 'react'
import '../../css/LogSign.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import imgUrl from '../../../public/icons/shreddedlogoblue.png'
import axios from 'axios';

function Login({ setLoginComponent, setUserObject, setComponent, setPassword, setUsername, username, password}) {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('username: ', username);
    console.log('password: ', password);

    if(username === '') {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if(password === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if(username !== '' && password !== '') {
      axios.get(`http://localhost:3000/login?username=${username}&password=${password}`)
      .then((res) => {
        console.log('success', res);
        if(res.data === 'NO USER') {
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
        console.log('error')
        console.log(err);
      })
    }
  }

  const handleSignup = () => {
    console.log('username: ', username);
    console.log('password: ', password);

    if(username === '') {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if(password === '') {
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
