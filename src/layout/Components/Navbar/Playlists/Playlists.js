import classNames from 'classnames/bind';
import styles from './Playlists.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMusic, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { SpotifyIcon } from '~/assets/Icon/Icon';
import Button from '~/components/button/Button';
import NameUser from '~/components/NameUser/NameUser';
import { useContext } from 'react';
import { LoginAndRegister } from '~/components/Context/LoginAndRegister';
const cx = classNames.bind(styles);

function Playlists({ listP }) {
    const Logins = useContext(LoginAndRegister);

    return (
        <div className={cx('list')}>
            {!Logins.login ? (
                <div className={cx('create_plalist_music')}>
                    <Button to={'/login'}>Tạo danh sách phát</Button>
                </div>
            ) : (
                <>
                    <div className={cx('like_Song')}>
                        <div>
                            <SpotifyIcon />
                        </div>
                        <div className={cx('title_List_Play')}>
                            <h3>Bài hát đã thích</h3>
                            <span>
                                <p>
                                    <FontAwesomeIcon icon={faThumbTack} />
                                </p>
                                Danh sách phát <FontAwesomeIcon icon={faCircle} /> 6 bài hát
                            </span>
                        </div>
                    </div>
                    <ul>
                        {listP.map((element) => {
                            return (
                                <Button to={element.to}>
                                    <li key={element.id}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faMusic} />
                                        </div>
                                        <div className={cx('title_List_Play')}>
                                            <h3>{element.textlist + ' #' + element.id}</h3>
                                            <span>
                                                Danh sách phát <FontAwesomeIcon icon={faCircle} /> <NameUser />
                                            </span>
                                        </div>
                                    </li>
                                </Button>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Playlists;
