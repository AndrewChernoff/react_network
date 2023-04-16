import HeaderContainer from "./components/Header/HeaderContainer";
import SideBar from "./components/SideBar/SideBar";
import s from "./App.module.scss";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import DialogItem from "./components/Messages/DialogItem/DialogItem";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import UserProfile from "./components/UserProfile/UserProfile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useStoreDispatch } from "./redux/reducers";
import { initializeThunk } from "./redux/reducers/appReducer";

function App() {

  const isInit = useSelector<AppState, boolean>(state => state.initialize.init)
  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(initializeThunk())
  }, []) 

  return (
        <div className={s.app}>
          <HeaderContainer />
          <SideBar />
          <div className={s.content}>
          {isInit &&  <Routes>
            <Route path="" element={ <Navigate to="profile" />} />
            <Route path="profile" element={<ProfileContainer />} />
            <Route path="profile/:id" element={</* UserProfile */ProfileContainer />} />
            <Route path="users" element={<UsersContainer />} />
            <Route path="messages" element={<MessagesContainer />} />
            <Route path="messages/:id" element={<DialogItem />} />
            <Route path="news" element={<News />} />
            <Route path="music" element={<Music />} />
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<Login />} />
          </Routes>}
          </div>
        </div>
  );
}

export default App;
