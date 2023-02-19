import HeaderContainer from "./components/Header/HeaderContainer";
import SideBar from "./components/SideBar/SideBar";
import s from "./App.module.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import DialogItem from "./components/Messages/DialogItem/DialogItem";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
        <div className={s.app}>
          <HeaderContainer />
          <SideBar />
          <div className={s.content}>
          <Routes>
            <Route path="" element={ <Navigate to="profile" />} />
            <Route path="profile" element={<ProfileContainer />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="users" element={<UsersContainer />} />
            <Route path="messages" element={<MessagesContainer />} />
            <Route path="messages/:id" element={<DialogItem />} />
          </Routes>
          </div>
        </div>
  );
}

export default App;
