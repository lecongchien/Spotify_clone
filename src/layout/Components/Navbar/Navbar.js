import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import Tippy from '@tippyjs/react';
import Button from '~/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Gridview } from '~/assets/Icon/Icon';
import {
    faArrowLeft,
    faArrowRight,
    faBook,
    faFolder,
    faHeadphones,
    faHouse,
    faMagnifyingGlass,
    faPlus,
    faSearch,
    faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import Playlists from './Playlists';
import { LoginAndRegister } from '~/components/Context/LoginAndRegister';
import { Setsize } from '~/components/Context/Setsize';

const cx = classNames.bind(styles);

function Navbar() {
    const [HandelSizes, setHandelSizes] = useState(false);
    const navbarRef = useRef(null);
    const handelsizetext = useRef(null);
    const [handlefolder, setHandleFoder] = useState(false);
    const [listPlay, setListPlay] = useState([]);
    const [listCount, setListCount] = useState(0);
    const Logins = useContext(LoginAndRegister);

    const category = [
        {
            id: 1,
            text: 'Trang chủ',
            to: '/',
            fontaws: <FontAwesomeIcon icon={faHouse} />,
        },
        {
            id: 2,
            text: 'Tìm kiếm',
            to: '/search/',
            fontaws: <FontAwesomeIcon icon={faMagnifyingGlass} />,
        },
    ];

    const list = [
        {
            id: 1,
            textlist: 'Danh sách phát của tôi',
            to: `/playlist/`,
        },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                navbarRef.current.style.width = '35px';
                navbarRef.current.style.backgroundColor = 'transparent';
                handelsizetext.current.style.padding = '0 0 0 50px';
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const setWidth = () => {
        navbarRef.current.style.width = '100%';
        navbarRef.current.style.backgroundColor = 'rgb(50, 50, 50)';
        navbarRef.current.style.transition = '200ms ease-in-out';
        handelsizetext.current.style.padding = '0';
    };

    const Increasesize = () => {
        setHandelSizes(!HandelSizes);
    };

    const changeListPlay = () => {
        setHandleFoder(!handlefolder);
    };

    const creactMusic = () => {
        if (Logins.login) {
            const newId = list.length;
            const newItem = {
                id: newId + listCount,
                textlist: 'Danh sách phát của tôi',
                to: `/MyPlaylist/${newId + listCount}`,
            };
            setListPlay((prevList) => [...prevList, newItem]);
            setListCount((prevCount) => prevCount + 1);
        }
    };

    return (
        <>
            <div className={cx('navbar')}>
                <Setsize.Consumer>
                    {(context) => {
                        context.Size(HandelSizes);
                    }}
                </Setsize.Consumer>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('category')}>
                            {category.map((element) => {
                                return (
                                    <Button
                                        nav={element.to}
                                        dflex
                                        key={element.id}
                                        title={element.text}
                                        icon={element.fontaws}
                                        className={(active) => cx('list', { active: active.isActive })}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('navbar_off')}>
                        <div className={cx('itemslist')}>
                            <div className={cx('collection')}>
                                <FontAwesomeIcon icon={faBook} />
                                <Tippy
                                    className={cx('tippy-title')}
                                    arrow={false}
                                    placement={'top'}
                                    content="Thu gọn thư viện"
                                >
                                    <p>Thư viện</p>
                                </Tippy>
                            </div>
                            <div className={cx('functions_library')}>
                                <Tippy
                                    className={cx('tippy-title')}
                                    arrow={false}
                                    placement={'top'}
                                    content="Tạo danh sách phát và thư mục"
                                >
                                    <FontAwesomeIcon onClick={() => changeListPlay()} icon={faPlus} />
                                </Tippy>
                                {handlefolder ? (
                                    <div className={cx('add_foder')}>
                                        <ul>
                                            <li onClick={creactMusic}>
                                                <FontAwesomeIcon icon={faHeadphones} />
                                                <p>Tạo danh sách phát mới</p>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faFolder} />
                                                <p>Tạo thư mục danh sách phát</p>
                                            </li>
                                        </ul>
                                    </div>
                                ) : null}
                                <Tippy
                                    className={cx('tippy-title')}
                                    arrow={false}
                                    placement={'top'}
                                    content="Lưu vào Thư viện"
                                >
                                    {HandelSizes ? <Gridview /> : null}
                                </Tippy>
                                <Tippy
                                    className={cx('tippy-title')}
                                    arrow={false}
                                    placement={'top'}
                                    content={(!HandelSizes ? 'Tăng' : 'Giảm') + ' ' + 'kích thước Thư viện'}
                                >
                                    <FontAwesomeIcon
                                        icon={!HandelSizes ? faArrowRight : faArrowLeft}
                                        onClick={() => Increasesize()}
                                    />
                                </Tippy>
                            </div>
                        </div>
                        <div className={cx('sequence')}>
                            <Button smallButton>Danh sách phát</Button>
                            <Button smallButton>Album</Button>
                        </div>
                        <div className={cx('playlist')}>
                            <div className={cx('content_list_play_music')}>
                                <div className={cx('collection_Items')}>
                                    <form ref={navbarRef}>
                                        <FontAwesomeIcon icon={faSearch} onClick={() => setWidth()} />
                                        <input type="text" placeholder="Tìm kiếm trong thư viện " />
                                    </form>
                                    <p ref={handelsizetext}>Gần đây</p>
                                    <div className={cx('recently')}>
                                        <FontAwesomeIcon icon={faSortDown} />
                                    </div>
                                </div>
                                <Playlists listP={listPlay} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
