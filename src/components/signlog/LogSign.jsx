import { useState } from 'react'
import '../../css/LogSign.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login({ setComponent }) {
  //const [count, setCount] = useState(0)

  return (
    <div className="loginWrapper">
      <div className="login">
        LOGIN
      </div>
      <br/>
      <TextField id="outlined-basic" label="Username" />
      <br/><br/>
      <TextField id="outlined-basic" label="Password" type="password" />
      <br/><br/>
      <Button sx={{mr: 2}} onClick={() => {setComponent('profile')}}>
        Login
      </Button>
      <Button onClick={() => {setComponent('profile')}}>
        Signup
      </Button>
    </div>
  )
}

export default Login
