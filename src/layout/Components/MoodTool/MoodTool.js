import classNames from 'classnames/bind';
import styles from './MoodTool.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faImages } from '@fortawesome/free-solid-svg-icons';
import { HeartLips } from '~/assets/Icon/Icon';

const cx = classNames.bind(styles);

function MoodTool() {
    return (
        <div className={cx('moodTool')}>
            <div className={cx('music_information')}>
                <div className={cx('image')}>
                    <img src="https://i.pinimg.com/564x/89/02/b6/8902b65d6898166ee276d572ffe71e55.jpg" alt="" />
                </div>
                <div className={cx('title')}>
                    <a href="" className={cx('title_name_song')}>
                        Cigaretter after sex
                    </a>
                    <a href="" alt="">
                        Youre are want
                    </a>
                </div>
                <HeartLips />
                <FontAwesomeIcon icon={faImages} />
            </div>
            <div className={cx('function_seet_music')}>2</div>
            <div className={cx('Tool_Users')}>3</div>
        </div>
    );
}

export default MoodTool;
