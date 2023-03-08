import { useState } from 'react'
import '../../css/LogSign.css'
import LogSign from './LogSign.jsx';
import UserSetup from './UserSetup.jsx';


function LogSignMain({ setComponent, setLoggedUser, setUserID }) {
  const [loginComponent, setLoginComponent] = useState('logsign');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currComponent = (loginComponent) => {
    switch (loginComponent) {
      case 'logsign' :
        return (<LogSign setLoggedUser={setLoggedUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword}setLoginComponent={setLoginComponent} setComponent={setComponent} setUserID={setUserID} />);
      case 'usersetup' :
        return (<UserSetup setLoggedUser={setLoggedUser} setUsername={setUsername} username={username} password={password} setLoginComponent={setLoginComponent} setComponent={setComponent}/>);
    }
  }

  return (
    <div className="wholeLoginWrapper">
      {currComponent(loginComponent)}
    </div>
  );
}

export default LogSignMain;
