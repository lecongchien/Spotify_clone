import classNames from 'classnames/bind';
import styles from './Playlists.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMusic, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { SpotifyIcon } from '~/assets/Icon/Icon';
const cx = classNames.bind(styles);

function Playlists() {
    const list = [
        {
            id: 1,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 2,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 3,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 4,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 5,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 6,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 7,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 8,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 9,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 10,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 11,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 12,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 13,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 14,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 15,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 16,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 17,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 18,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 19,
            textlist: 'Danh sách phát của tôi',
        },
        {
            id: 20,
            textlist: 'Danh sách phát của tôi',
        },
    ];
    return (
        <div className={cx('list')}>
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
                {list.map((element) => {
                    return (
                        <li key={element.id}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faMusic} />
                            </div>
                            <div className={cx('title_List_Play')}>
                                <h3>{element.textlist + ' #' + element.id}</h3>
                                <span>
                                    Danh sách phát <FontAwesomeIcon icon={faCircle} /> Chiến lê
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Playlists;
