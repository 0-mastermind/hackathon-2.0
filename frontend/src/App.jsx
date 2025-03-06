import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/about/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Connect from "./Components/dashboard/dashboardPages/Connect/Connect";
import Jobs from "./Components/dashboard/dashboardPages/Jobs/Jobs";
import Events from "./Components/dashboard/dashboardPages/Events/Events";
import Posts from "./Components/dashboard/dashboardPages/Posts/Posts";
import Discussion from "./Components/dashboard/dashboardPages/Discussion/Discussion";
import PostJobs from "./Components/dashboard/dashboardPages/postJobs/PostJobs";
import MyProfile from "./Components/dashboard/dashboardPages/MyProfile/MyProfile";
import SeeApplications from "./Components/dashboard/dashboardPages/SeeApplications/SeeApplications";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/connect" element={<Connect />} />
          <Route path="/dashboard/job" element={<Jobs />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/posts" element={<Posts />} />
          <Route path="/dashboard/discussion" element={<Discussion />} />
          <Route path="/dashboard/post-job" element={<PostJobs />} />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/see-applications" element={<SeeApplications />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
