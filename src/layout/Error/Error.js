import classNames from 'classnames/bind';
import styles from './error.module.scss';

const cx = classNames.bind(styles);
function Error() {
    return (
        <div className={cx('InfoBanner')}>
            <div className={cx('error')}>
                <span className={cx('reversed_reversedRight')}>
                    <span>&#9888;</span>
                </span>
                <span className={cx('reversed_reversedLeft')}>Bài hát bị lỗi vui lòng chọn bài khác !!</span>
            </div>
        </div>
    );
}

export default Error;
