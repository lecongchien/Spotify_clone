import classNames from 'classnames/bind';
import styles from './ButtonCriclePlay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ButtonCriclePlay() {
    return (
        <button className={cx('cricle_Green_Play')}>
            <FontAwesomeIcon icon={faPlay} />
        </button>
    );
}

export default ButtonCriclePlay;
