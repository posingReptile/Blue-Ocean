import { useState } from 'react'
import '../../css/LogSign.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import imgUrl from './biceplogo.png'
import axios from 'axios';

function Login({ setComponent }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('username: ', username);
    console.log('password: ', password)
    axios.get('/login', {
      params: {
        username: username,
        password: password,
      }
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleSignup = () => {
    console.log('username: ', username);
    console.log('password: ', password);
    axios.post('/login', {
      username: username,
      password: password,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="loginWrapper">
      <img src={imgUrl} style={{width:500, height:120}}/>
      <br/>
      <TextField sx={{mb: 1}} id="outlined-basic" size="small" label="Username" onChange={handleUsernameChange} />
      <br/>
      <TextField sx={{mb: 1}} id="outlined-basic" size="small" label="Password" type="password" onChange={handlePasswordChange} />
      <br/>
      <Button sx={{mr: 2}} onClick={() => handleLogin()}>
        Login
      </Button>
      <Button onClick={() => handleSignup()}>
        Signup
      </Button>
    </div>
  )
}

export default Login
