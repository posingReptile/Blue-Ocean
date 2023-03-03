import { useState } from 'react'
//import '../../css/'

function Login({ setComponent }) {
  //const [count, setCount] = useState(0)

  return (
    <div>
      Login/Signup
      <button onClick={() => {setComponent('profile')}}>back to start</button>
    </div>
  )
}

export default Login
