import s from './Sidebar.module.scss';

const SideBar = () => {
    return <nav className={s.sidebar}>
        <ul>
            <li>Profile</li>
            <li>Messages</li>
            <li>News</li>
            <li>Music</li>
            <li>Settings</li>
        </ul>
    </nav>
}

export default SideBar;