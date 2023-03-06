import { useState } from "react";
import Profile from "./components/profile/profile.jsx";
import LogSign from "./components/signlog/LogSign.jsx";
import UserSetup from "./components/signlog/UserSetup.jsx";
import CalendarPage from "./components/calendar/Calendar.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

// Testing NavBar production
import NavBar from "./components/navbar/NavBar.jsx";
import ResponsiveNavBar from "./components/navbar/ResponsiveNavBar.jsx";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/material/Button";

import "./css/App.css";

function App() {
  const [count, setCount] = useState(0);
  const [component, setComponent] = useState("profile");
  const [currentDay, setCurrentDay] = useState(new Date());

  const currComponent = (component) => {
    console.log("currComponent");
    switch (component) {
      case "profile":
        console.log(component);
        return <Profile />;
      case "dashboard":
        console.log(component);
        return <Dashboard />;
      case "logsign":
        console.log(component);
        return <LogSign setComponent={setComponent} />;
      case "usersetup":
        console.log(component);
        return <UserSetup setComponent={setComponent} />;
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
          {component !== "logsign" && component !== "usersetup" && (
            // <NavBar setComponent={setComponent} />
            // <NewNavBar setComponent={setComponent} />
            <ResponsiveNavBar />
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
