import PostItem from '../PostItem/PostItem';
import s from './Profile.module.scss';

const Profile = () => {
    return <div className={s.content}>
        <div className={s.content__container}>
        <h2>Ava + descr</h2>

    <div className={s.content__post}>
        <textarea/>
        <button>Add post</button>
    </div>
    <PostItem message={'hey'} likes={5}/>
    </div>
    </div>
}

export default Profile;