import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import s from './App.module.scss';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className={s.app}>
      <Header/>
      <SideBar/>
      <Profile/>
    </div>
  );
}

export default App;