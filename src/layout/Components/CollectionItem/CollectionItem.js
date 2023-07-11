import classNames from 'classnames/bind';
import styles from './CollectionItem.module.scss';
import Button from '~/components/button/Button';
const cx = classNames.bind(styles);
function CollectionItem() {
    const collection = [
        {
            id: 1,
            text: 'Playlist',
            to: '/collection/playlists',
        },
        {
            id: 2,
            text: 'Podcast',
            to: '/collection/Podcast',
        },
        {
            id: 3,
            text: 'Nghệ sĩ',
            to: '/collection/artists',
        },
        {
            id: 4,
            text: 'Album',
            to: '/collection/album',
        },
    ];
    return (
        <div className={cx('collection')}>
            <ul>
                {collection.map((element) => {
                    return (
                        <li key={element.id}>
                            <Button
                                className={(active) => cx('list', { active: active.isActive })}
                                nav={element.to}
                                key={element.id}
                            >
                                {element.text}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CollectionItem;
