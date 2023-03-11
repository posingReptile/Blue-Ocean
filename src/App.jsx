import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Container, Box, Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/material/Button";
import Profile from "./components/profile/profile.jsx";
import LogSignMain from "./components/signlog/LogSignMain.jsx";
import UserSetup from "./components/signlog/UserSetup.jsx";
import CalendarPage from "./components/calendar/Calendar.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Meals from "./components/modal/meals/Meals.jsx";
import ResponsiveNavBar from "./components/navbar/ResponsiveNavBar.jsx";
import "./css/App.css";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [component, setComponent] = useState("logsign");
  const [currentDay, setCurrentDay] = useState(new Date());
  const [userObject, setUserObject] = useState({});
  const [totalDailyCalories, setDailyCalories] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/session").then((res) => {
      if (res.data.user_id) {
        setComponent("dashboard");
        setUserObject({
          username: res.data.username,
          user_id: res.data.user_id,
          isadmin: res.data.isadmin,
        });
      }
    });
  }, []);

  const currDateInt = Number(format(new Date(currentDay), "yyyyMMdd"));

  const currComponent = (component) => {
    switch (component) {
      case "profile":
        return <Profile userID={userObject.user_id} />;
      case "dashboard":
        return (
          <Dashboard
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currDateInt={currDateInt}
            userID={userObject.user_id}
          />
        );
      case "logsign":
        return (
          <LogSignMain
            setUserObject={setUserObject}
            setComponent={setComponent}
          />
        );
      case "calendar":
        return (
          <CalendarPage
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currDateInt={currDateInt}
            userID={userObject.user_id}
          />
        );
    }
  };

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
            <ResponsiveNavBar
              sx={{ width: "100%" }}
              userObject={userObject}
              setUserObject={setUserObject}
              setComponent={setComponent}
            />
          )}
          {currComponent(component)}
        </Box>
      </Container>
    </>
  );
}

export default App;
