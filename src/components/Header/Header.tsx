import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../../imgs/logo.png";
import s from "./Header.module.scss";

type HeaderType = {
  isAuth: boolean
  userId: number | null
};

const Header = ({ isAuth, userId }: HeaderType) => {
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
      }, [userId])


  return (
    <div className={s.header}>
      <img src={logo} className={s.header__logo} alt="logo" />
      <div className={s.user}>
        {userAva ? <img className={s.user__ava} src={userAva} alt='user ava'/> : null }
        {isAuth? <button className={s.btn}>Logout</button> : <button className={s.btn}>Login</button>}
      </div>
    </div>
  );
};

export default Header;
