import { useState, useEffect } from 'react';
import Profile from './components/profile/profile.jsx';
import LogSignMain from './components/signlog/LogSignMain.jsx';
import UserSetup from './components/signlog/UserSetup.jsx';
import CalendarPage from './components/calendar/Calendar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import NavBar from './components/navbar/NavBar.jsx';
import Meals from './components/modal/meals/Meals.jsx';
import ResponsiveNavBar from './components/navbar/ResponsiveNavBar.jsx';
import axios from 'axios';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/material/Button";

import "./css/App.css";

function App() {
  const [count, setCount] = useState(0);
  const [loggedUser, setLoggedUser] = useState("");
  const [component, setComponent] = useState("logsign");
  const [currentDay, setCurrentDay] = useState(new Date());
  const [userID, setUserID] = useState(0);
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/session').then((res) => {
      console.log('res.data', res.data);
      if (res.data.user_id) {
        setUserID(res.data.user_id);
        setComponent('dashboard');
        setUserObject({
          username: res.data.username,
          user_id: res.data.user_id,
          isadmin: res.data.isadmin,
        });
      }
    });
  }, []);


  const currDateInt = Number(format(new Date(currentDay), "yyyyMMdd"));
  // console.log(currDateInt);

  const currComponent = (component) => {
    console.log("Our current component is:", component);
    switch (component) {
      case "profile":
        console.log(component);
        return <Profile userID={userID} />;
      case "dashboard":
        console.log(component);
        return (
          <Dashboard
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currDateInt={currDateInt}
            userID={userObject.user_id}
          />
        );
      case "logsign":
        console.log(component);
        return (
          <LogSignMain
            setUserObject={setUserObject}
            setComponent={setComponent}
          />
        );
      case "calendar":
        console.log(component);
        return (
          <CalendarPage currentDay={currentDay} setCurrentDay={setCurrentDay} />
        );
    }
  };

  const test = 0;

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "100vh",
          }}
        >
          {component !== 'logsign' && component !== 'usersetup' && (
            <ResponsiveNavBar setUserObject={setUserObject} setComponent={setComponent} />
          )}
          {currComponent(component)}
        </Box>
      </Container>
    </>
  );
}

export default App;
