import { Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import UnAuthLayout from "../layouts/unauth/Layout";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Logout from "../pages/logout/Logout";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<UnAuthLayout />}>
        <Route path="" element={<Landing />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="logout" element={<Logout />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
