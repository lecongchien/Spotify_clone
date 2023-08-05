import React, { useEffect, useRef, useState } from 'react';
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
    faHouse,
    faMagnifyingGlass,
    faPlus,
    faSearch,
    faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import Playlists from './Playlists';
import { Setsize } from '~/App';
import images from '~/assets/image';

const cx = classNames.bind(styles);

function Navbar() {
    const [HandelSizes, setHandelSizes] = useState(false);
    const navbarRef = useRef(null);
    const handelsizetext = useRef(null);

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
                                    content="Lưu vào Thư viện"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </Tippy>
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
                                <Playlists />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
