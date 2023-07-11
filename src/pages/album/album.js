import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Collection from '../Collection';
import styles from './album.module.scss';
const cx = classNames.bind(styles);

function Album() {
    return (
        <div className={cx('album')}>
            <Collection
                to="/search"
                title="Theo dõi album đầu tiên của bạn"
                follow="Lưu album bằng cách nhấn vào biểu tượng trái tim."
                handle="Tìm album"
                icon={<FontAwesomeIcon icon={faCircleDot} />}
            />
        </div>
    );
}

export default Album;
