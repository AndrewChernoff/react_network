import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import s from './App.module.scss';

function App() {
  return (
    <div className={s.app}>
      <Header/>
      <SideBar/>
      
    </div>
  );
}

export default App;