import { useState } from 'react'
import '../../css/LogSign.css'
import LogSign from './LogSign.jsx';
import UserSetup from './UserSetup.jsx';


function LogSignMain({ setComponent, setUserObject }) {
  const [loginComponent, setLoginComponent] = useState('logsign');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currComponent = (loginComponent) => {
    switch (loginComponent) {
      case 'logsign' :
        return (<LogSign setUserObject={setUserObject} username={username} setUsername={setUsername} password={password} setPassword={setPassword}setLoginComponent={setLoginComponent} setComponent={setComponent} />);
      case 'usersetup' :
        return (<UserSetup setUserObject={setUserObject} setUsername={setUsername} username={username} password={password} setLoginComponent={setLoginComponent} setComponent={setComponent}/>);
    }
  }

  return (
    <div className="wholeLoginWrapper">
      <div className="heightWrapper">
        {currComponent(loginComponent)}
      </div>
    </div>
  );
}

export default LogSignMain;
