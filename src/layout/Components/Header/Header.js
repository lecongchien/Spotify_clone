import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/button/Button';
import { faArrowUpRightFromSquare, faChevronLeft, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SearchItem from '~/pages/Search/SearchItem';
import CollectionItem from '../CollectionItem';
import config from '~/config';
import { CricleDown } from '~/assets/Icon/Icon';

const cx = classNames.bind(styles);

function Header() {
    const [changes, setChanges] = useState(false);
    const run = window.location.href.split('/');

    const location = useLocation();
    const allLocation = location.pathname;
    const setIdAlbum = allLocation.split('/');
    const IdAlBum = setIdAlbum[2];

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
        },
    ];

    console.log(allLocation);
    return (
        <div className={cx('header')}>
            <div className={cx('container')}>
                <div className={cx('left-sidebar')}>
                    <Button button icon={<FontAwesomeIcon icon={faChevronLeft} />} />
                    <Button button icon={<FontAwesomeIcon icon={faChevronRight} />} />
                    {allLocation === '/' ? null : (
                        <>
                            {allLocation === '/search/' || allLocation === `/search/${run[4]}` ? (
                                <SearchItem />
                            ) : (
                                <>
                                    {allLocation === '/search/' ? (
                                        <SearchItem />
                                    ) : (
                                        <>{allLocation === `/albums/${IdAlBum}` ? null : <CollectionItem />}</>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className={cx('right-sidebar')}>
                    {allLocation === config.routes.search ||
                        allLocation === config.routes.playlist ||
                        allLocation === config.routes.album ||
                        allLocation === config.routes.podcast ||
                        allLocation === config.routes.artists || <Button button active title={'Nâng cấp'} />}
                    <Button settingapp title={'Cài đặt ứng dụng'} icon={<CricleDown />} />
                    <Button user icon={<FontAwesomeIcon icon={faUser} />} onClick={() => setChanges(!changes)} />
                    {changes ? (
                        <div className={cx('utility_box')}>
                            <ul>
                                {utilityBox.map((element) => {
                                    return (
                                        <li>
                                            <Button to={element.to}>
                                                {element.text}
                                                {element.icon}
                                            </Button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Header;
