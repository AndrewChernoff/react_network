import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import s from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import DialogItem from "./components/Messages/DialogItem/DialogItem";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";

function App() {
  return (
        <div className={s.app}>
          <Header />
          <SideBar />
          <div className={s.content}>
          <Routes>
            <Route index element={<ProfileContainer />} />
            <Route path="users" element={<UsersContainer />} />
            <Route path="messages" element={<MessagesContainer />} />
            <Route path="messages/:id" element={<DialogItem />} />
          </Routes>
          </div>
        </div>
  );
}

export default App;
