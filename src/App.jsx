import { useState } from 'react';
import Profile from './components/profile/profile.jsx';
import LogSignMain from './components/signlog/LogSignMain.jsx';
import UserSetup from './components/signlog/UserSetup.jsx';
import CalendarPage from './components/calendar/Calendar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import NavBar from './components/navbar/NavBar.jsx';
import Meals from './components/modal/meals/Meals.jsx'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/material/Button';



function App() {
  const [count, setCount] = useState(0);
  const [component, setComponent] = useState("profile");
  const [currentDay, setCurrentDay] = useState(new Date());

  const currComponent = (component) => {
    switch (component) {
      case "profile":
        console.log(component);
        return <Profile />;
      case "dashboard":
        console.log(component);
        return <Dashboard />;
      case "logsign":
        console.log(component);
        return (<LogSignMain setComponent={setComponent}/>);
      case 'usersetup' :
        console.log(component);
        return (<LogSignMain setComponent={setComponent}/>);
      case 'calendar' :
        console.log(component);
        return (<CalendarPage currentDay={currentDay} setCurrentDay={setCurrentDay}/>);
    }
  };

  const test = 0;

  return (
    <div className="App">
      {/*<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
      </TabPanel>*/}
      {component !== "logsign" && component !== "usersetup" && (
        <NavBar setComponent={setComponent} currComponent={currComponent}/>
      )}
      {currComponent(component)}
      <Meals/>
    </div>
  );
}

export default App;
