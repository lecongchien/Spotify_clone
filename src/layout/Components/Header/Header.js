import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/button/Button';
import { faArrowUpRightFromSquare, faChevronLeft, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchItem from '~/pages/Search/SearchItem';
import CollectionItem from '../CollectionItem';
import config from '~/config';
import { CricleDown } from '~/assets/Icon/Icon';
import { signOut } from 'firebase/auth';
import { databate } from '~/components/PasswordLoginWithFirebase/FireBaseConfig';
import { LoginAndRegister } from '~/components/Context/LoginAndRegister';

const cx = classNames.bind(styles);

function Header() {
    const [changes, setChanges] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const location = useLocation();
    const allLocation = location.pathname;
    const setIdAlbum = allLocation.split('/');
    const IdAlBum = setIdAlbum[2];
    const Logins = useContext(LoginAndRegister);
    const history = useNavigate();
    const utilityBox = [
        {
            id: 1,
            text: 'Tài khoản',
            icon: <FontAwesomeIcon icon={faArrowUpRightFromSquare} />,
            to: '/',
        },
        {
            id: 2,
            text: 'Hồ sơ',
            icon: '',
            to: '/user/',
        },
        {
            id: 3,
            text: 'Nâng cấp lên Premium',
            icon: <FontAwesomeIcon icon={faArrowUpRightFromSquare} />,
            to: '/premium/',
        },
        {
            id: 4,
            text: 'Hỗ trợ',
            icon: <FontAwesomeIcon icon={faArrowUpRightFromSquare} />,
            to: '/',
        },
        {
            id: 5,
            text: 'Tải xuống',
            icon: <FontAwesomeIcon icon={faArrowUpRightFromSquare} />,
            to: '/download/',
        },
        {
            id: 6,
            text: 'Cài đặt',
            icon: '',
            to: '/preferences/',
        },
        {
            id: 7,
            text: 'Đăng xuất',
            icon: '',
            to: '/',
            onclick: () => {
                setIsLoggingOut(true);
                signOut(databate)
                    .then((val) => {
                        setTimeout(() => {
                            setIsLoggingOut(false);
                            history('/login');
                            setTimeout(() => {
                                history('/');
                                setChanges(false);
                            }, 500);
                        }, 0);
                    })
                    .catch((error) => {
                        console.log('Đã xảy ra lỗi khi đăng xuất:', error);
                    });
            },
        },
    ];
    return (
        <div className={cx('header')}>
            <div className={cx('container')}>
                <div className={cx('left-sidebar')}>
                    <Button button icon={<FontAwesomeIcon icon={faChevronLeft} />} />
                    <Button button icon={<FontAwesomeIcon icon={faChevronRight} />} />

                    {allLocation === '/' ? null : (
                        <>
                            {!(
                                allLocation === `/artist/${IdAlBum}` ||
                                allLocation === `/albums/${IdAlBum}` ||
                                allLocation === `/MyPlaylist/${IdAlBum}` ||
                                allLocation === `/playlists/${IdAlBum}` ||
                                allLocation === config.routes.playlist ||
                                allLocation === config.routes.album ||
                                allLocation === config.routes.podcast ||
                                allLocation === config.routes.artists ||
                                allLocation === config.routes.Login ||
                                allLocation === config.routes.Register
                            ) ? (
                                <SearchItem />
                            ) : null}
                        </>
                    )}
                </div>
                <div className={cx('right-sidebar')}>
                    {Logins.login ? (
                        <>
                            {allLocation === config.routes.search ||
                                allLocation === config.routes.playlist ||
                                allLocation === config.routes.album ||
                                allLocation === config.routes.podcast ||
                                allLocation === config.routes.artists || <Button button active title={'Nâng cấp'} />}
                            <Button settingapp title={'Cài đặt ứng dụng'} icon={<CricleDown />} />
                            <Button
                                user
                                icon={<FontAwesomeIcon icon={faUser} />}
                                onClick={() => setChanges(!changes)}
                            />
                            {changes ? (
                                <div className={cx('utility_box')}>
                                    <ul>
                                        {utilityBox.map((element) => {
                                            return (
                                                <li>
                                                    <Button to={element.to} onClick={element.onclick}>
                                                        {element.text}
                                                        {element.icon}
                                                    </Button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <div className={cx('formUser')}>
                            <button className={cx('register')}>
                                <Button to={'/register'}>Đăng Ký</Button>
                            </button>
                            <button className={cx('login')}>
                                <Button to={'/login'}>Đăng nhập</Button>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
