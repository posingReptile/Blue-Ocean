import { useState } from "react";
import Profile from "./components/profile/profile.jsx";
import LogSignMain from "./components/signlog/LogSignMain.jsx";
import UserSetup from "./components/signlog/UserSetup.jsx";
import CalendarPage from "./components/calendar/Calendar.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import Meals from "./components/modal/meals/Meals.jsx";

import ResponsiveNavBar from "./components/navbar/ResponsiveNavBar";

import WorkoutDash from "./components/modal/workout/WorkoutDash";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/material/Button";

function App() {
  const [count, setCount] = useState(0);
  const [loggedUser, setLoggedUser] = useState("");
  const [component, setComponent] = useState("logsign");
  const [currentDay, setCurrentDay] = useState(new Date());

  const currComponent = (component) => {
    console.log("Our current component is:", component);
    switch (component) {
      case "profile":
        console.log(component);
        return <Profile />;
      case "dashboard":
        console.log(component);
        return <Dashboard />;
      case "logsign":
        console.log(component);
        return <LogSignMain setLoggedUser={setLoggedUser} setComponent={setComponent} />;
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
            <ResponsiveNavBar setComponent={setComponent} />
          )}
          {currComponent(component)}
          {/* {component !== "logsign" && component !== "usersetup" && (
            <NavBar setComponent={setComponent} currComponent={currComponent} />
          )} */}
        </Box>
      </Container>
    </>
  );
}

export default App;
