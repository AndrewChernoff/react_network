import { NavLink } from 'react-router-dom';
import s from './Sidebar.module.scss';

const SideBar = () => {

    const navLinkStyles = ({isActive}:any) => {
        return {color: isActive ? 'gold' : 'white'}
       }

    return <nav className={s.sidebar}>
        <ul>
           <li> <NavLink to='' style={navLinkStyles}>Profile</NavLink > </li>
           <li> <NavLink to='messages' style={navLinkStyles}>Messages</NavLink></li>
           <li> <NavLink to='users' style={navLinkStyles}>Users</NavLink></li>
           <li> <NavLink to='news' style={navLinkStyles}>News</NavLink></li>
           <li><NavLink to='music' style={navLinkStyles}>Music</NavLink></li>
           <li><NavLink to='settings' style={navLinkStyles}>Settings</NavLink></li>
        </ul>
    </nav>
}

export default SideBar;