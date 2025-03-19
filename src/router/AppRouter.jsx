import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import PollList from "../pages/PollList";
import PollDetail from "../pages/PollDetail";
import CreatePoll from "../pages/CreatePoll";
import UpdatePoll from "../pages/UpdatePoll";
import MultiStepSurvey from "../pages/MultiStepSurvey";
import PollsTable from "../pages/PollsTable";
import PrivateRoute from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<PollsTable />} />
          <Route path="/dashboard" element={<PollList />} />
          <Route path="/poll/:id" element={<PollDetail />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/update-poll/:id" element={<UpdatePoll />} />
          <Route path="/survey/:id" element={<MultiStepSurvey />} />
        </Route>
      </Routes>
    </Router>
  );
};
