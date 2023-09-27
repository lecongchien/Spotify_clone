import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Collection from '../Collection';
import styles from './artists.module.scss';
const cx = classNames.bind(styles);

function Artists() {
    // const
    return (
        <div className={cx('artists')}>
            <Collection
                to="/search"
                title="Theo dõi nghệ sĩ đầu tiên của bạn"
                follow="Theo dõi nghệ sĩ bạn yêu thích bằng cách nhấn vào nút theo dõi."
                handle="Tìm nghệ sĩ"
                icon={<FontAwesomeIcon icon={faCircleUser} />}
            />
        </div>
    );
}

export default Artists;
