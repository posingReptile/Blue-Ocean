import { useState } from 'react';
import Profile from './components/profile/profile.jsx';
import LogSign from './components/signlog/LogSign.jsx';
import UserSetup from './components/signlog/UserSetup.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import NavBar from './components/navbar/NavBar.jsx';
import Workout from './components/modal/workout/Workout.jsx';
import './css/App.css';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/material/Button';



function App() {
  const [count, setCount] = useState(0);
  const [component, setComponent] = useState('profile');

  const currComponent = (component) => {
    switch (component) {
      case 'profile' :
        console.log(component);
        return (<Profile />);
      case 'dashboard' :
        console.log(component);
        return (<Dashboard />);
      case 'logsign' :
        console.log(component);
        return (<LogSign setComponent={setComponent}/>);
      case 'usersetup' :
        console.log(component);
        return (<UserSetup />);
      case 'calendar' :
        console.log(component);
        return (<Calendar />);
    }
  }

  const test = 0;

  return (
    <div className="App">
      <Workout />
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={test} onChange={() => console.log('hello')} aria-label="basic tabs example">
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanel value={test} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={test} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={test} index={2}>
        Item Three
      </TabPanel>
      {(component !== ('logsign' || 'usersetup')) &&
      <NavBar setComponent={setComponent}/>}
      {currComponent(component)} */}
    </div>
  )
}

export default App
