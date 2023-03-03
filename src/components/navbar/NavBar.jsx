import React from 'react';


function NavBar({ setComponent }) {

  return (
    <div className="nav-bar">
        <button onClick={() => {setComponent('calendar')}}>🗓️</button>
        <button onClick={() => {setComponent('dashboard')}}>dashboard</button>
        <button onClick={() => {setComponent('logsign')}}>loginsignup</button>
        <button onClick={() => {setComponent('usersetup')}}>user setup</button>
        <button onClick={() => {console.log('I am being pressed')}}>placeholder</button>
    </div>
  )
}

export default NavBar;