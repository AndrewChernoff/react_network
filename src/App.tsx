import HeaderContainer from "./components/Header/HeaderContainer";
import SideBar from "./components/SideBar/SideBar";
import s from "./App.module.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { ComponentType, Suspense,lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useStoreDispatch } from "./redux/reducers";
import { initializeThunk } from "./redux/reducers/appReducer";
import { Loader } from "./common/Loader";

const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
const DialogItem = lazy(() => import("./components/Messages/DialogItem/DialogItem"));
const MessagesContainer = lazy(() => import("./components/Messages/MessagesContainer"));
const News = lazy(() => import("./components/News/News"));
const Music = lazy(() => import("./components/Music/Music"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const Login = lazy(() => import("./components/Login/Login"));


function App() {
/* UserProfile component need to delete*/ 
  const isInit = useSelector<AppState, boolean>(state => state.initialize.init)
  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(initializeThunk())
  }, []) 

  const withLazyComponent = (LazyComponent: ComponentType) => {
    return () => (
      <Suspense fallback={<Loader/>}>
        <LazyComponent  />
      </Suspense>
    )
  }


  return (
        <div className={s.app}>
          <HeaderContainer />
          <SideBar />
          <div className={s.content}>
          {isInit &&  <Routes>
            <Route path="" element={ <Navigate to="profile" />} />
            <Route path="profile" element={withLazyComponent(ProfileContainer)()} />
            <Route path="profile/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
                <ProfileContainer />
            </Suspense>
          } /> 
            <Route path="users" element={withLazyComponent(UsersContainer)()} />
            <Route path="messages" element={withLazyComponent(MessagesContainer)()} />
            <Route path="messages/:id" element={withLazyComponent(DialogItem)()} />
            <Route path="news" element={withLazyComponent(News)()} />
            <Route path="music" element={withLazyComponent(Music)()} />
            <Route path="settings" element={withLazyComponent(Settings)()} />
            <Route path="login" element={withLazyComponent(Login)()} />
          </Routes>}
          </div>
        </div>
  );
}

export default App;
