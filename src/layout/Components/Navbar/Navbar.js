import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import images from '~/assets/image';
import Button from '~/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleArrowDown, faHouse, faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import Playlists from './Playlists';
const cx = classNames.bind(styles);

function Navbar() {
    const playlists = 'playlists';
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
        {
            id: 3,
            text: 'Thư viện',
            to: `/collection/${playlists}`,
            fontaws: <FontAwesomeIcon icon={faBook} />,
        },
    ];
    return (
        <div className={cx('navbar')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <Button to="/">
                        <img src={images.logo} alt="logo-spotifi" />
                    </Button>
                </div>
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
                    <div className={cx('itemslist')}>
                        <Button to dflex title="Tạo playlist" icon={<FontAwesomeIcon icon={faSquarePlus} />} />
                        <Button to heart title="Bài hát đã thích" icon={images.heart} />
                    </div>
                </div>
                <div className={cx('playlist')}>
                    <Playlists />
                </div>
                <div className={cx('dowmload')}>
                    <Button to dflex title="Cài đặt Ứng dụng" icon={<FontAwesomeIcon icon={faCircleArrowDown} />} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
