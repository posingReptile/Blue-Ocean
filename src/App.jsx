import { useState } from "react";
import Profile from "./components/profile/profile.jsx";
import LogSign from "./components/signlog/LogSign.jsx";
import UserSetup from "./components/signlog/UserSetup.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import NavBar from "./components/navbar/NavBar.jsx";

//Testing for workout
import WorkoutDash from "./components/modal/workout/WorkoutDash.jsx"; // Main Workout Dash
import DayWorkoutList from "./components/modal/workout/DayWorkoutList"; // Dash's list of exercise
import DayWorkoutListItem from "./components/modal/workout/DayWorkoutListItem"; // Individual item for Dash List
import ChooseMuscleModal from "./components/modal/workout/ChooseMuscleModal"; // Modal Popup to choose exercise

// import EditWorkout from "./components/modal/workout/temp/EditWorkout";
// import ChooseMuscle from "./components/modal/workout/temp/ChooseMuscle";
// import ChooseExercise from "./components/modal/workout/temp/ChooseExercise";
// import WorkoutDetails from "./components/modal/workout/temp/WorkoutDetails";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/material/Button";

import "./css/App.css";

function App() {
  const [count, setCount] = useState(0);
  const [component, setComponent] = useState("profile");

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
        return <LogSign setComponent={setComponent} />;
      case "usersetup":
        console.log(component);
        return <UserSetup setComponent={setComponent} />;
      case "calendar":
        console.log(component);
        return <Calendar />;
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
        <NavBar setComponent={setComponent} />
      )}
    </div>
  );
}

export default App;
