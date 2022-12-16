import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import s from "./App.module.scss";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/Messages";
import { Route, Routes } from "react-router-dom";
import DialogItem from "./components/Messages/DialogItem/DialogItem";

function App() {
  return (
        <div className={s.app}>
          <Header />
          <SideBar />
          <div className={s.content}>
          <Routes>
            <Route index element={<Profile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<DialogItem />} />
          </Routes>
          </div>
        </div>
  );
}

export default App;
