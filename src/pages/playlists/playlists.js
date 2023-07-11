import classNames from 'classnames/bind';
import styles from './playlists.module.scss';
const cx = classNames.bind(styles);

function Playlists() {
    return <div className={cx('playlist')}>playlist</div>;
}

export default Playlists;
