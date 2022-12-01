import logo from '../../imgs/logo.png';
import s from './Header.module.scss';

const Header = () => {
    return <div className={s.header}>
    <img src={logo} className={s.header__logo} alt='logo'/>
    </div> 
}

export default Header;