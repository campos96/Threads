import { Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import UnAuthLayout from "../layouts/unauth/Layout";
import AuthLayout from "../layouts/auth/Layout";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Logout from "../pages/logout/Logout";
import Home from "../pages/home/Home";
import ProfileIndex from "../pages/profile/Index";
import EditProfile from "../pages/profile/Edit";
import NewThread from "../pages/new-thread/NewThread";
import ReplyThread from "../pages/reply-thread/ReplyThread";
import { APP_ROOT } from "../routes/paths";
import ThreadDetails from "../pages/thread-details/ThreadDetails";

const Router = () => {
  return (
    <Routes>
      <Route path={APP_ROOT} element={<UnAuthLayout />}>
        <Route path="" element={<Landing />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="logout" element={<Logout />}></Route>
      </Route>
      <Route path={APP_ROOT} element={<AuthLayout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="profile/:username" element={<ProfileIndex />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="thread/:threadId" element={<ThreadDetails />} />
        <Route path="threads/new" element={<NewThread />} />
        <Route path="threads/reply/:threadId" element={<ReplyThread />} />
      </Route>
    </Routes>
  );
};

export default Router;
