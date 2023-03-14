import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../imgs/logo.png";
import API from "../../services/API";
import s from "./Header.module.scss";

type HeaderType = {
  isAuth: boolean
  userId: number | null
  logOut: () => void
};

const Header = ({ isAuth, userId, logOut }: HeaderType) => {
    const [userAva, setUserAva] = useState<null|string>(null)

    const getData = async (id: number) => {
        const { data } = await axios.get(
          `https://social-network.samuraijs.com/api/1.0//profile/${id}`
        );
        return await data;
      };

      useEffect(() => {
        if(userId) {
        getData(userId)
        .then(data => setUserAva(data.photos.small)
        )   
    }
      !isAuth && setUserAva(null)

      }, [userId, isAuth])


  return (
    <div className={s.header}>
      <img src={logo} className={s.header__logo} alt="logo" />
      <div className={s.user}>
        {userAva ? <img className={s.user__ava} src={userAva} alt='user ava'/> : null }
        {isAuth? <button className={s.btn} onClick={() => logOut()}>Logout</button> : <NavLink to='login' className={s.btn}>Login</NavLink>}
      </div>
    </div>
  );
};

export default Header;
