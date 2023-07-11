import classNames from 'classnames/bind';
import styles from './Playlists.module.scss';
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
            <ul>
                {list.map((element) => {
                    return (
                        <li key={element.id}>
                            {element.textlist + ' #' + element.id}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Playlists;
