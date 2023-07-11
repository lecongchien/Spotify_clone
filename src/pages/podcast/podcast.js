import classNames from 'classnames/bind';
import styles from './podcast.module.scss';
const cx = classNames.bind(styles);

function Podcast() {
    return <div className={cx('podcast')}>podcast</div>;
}

export default Podcast;
