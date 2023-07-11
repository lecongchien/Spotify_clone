import classNames from 'classnames/bind';
import styles from './UserfulFunction.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import { HeartIcon } from '~/assets/Icon/Icon';
import Button from '../button/Button';

const cx = classNames.bind(styles);

function UserfulFunction({ nameAlbum }) {
    const nameAlb = 'Các tùy chọn khác cho' + ' ' + nameAlbum;
    return (
        <div className={cx('Userful_Function')}>
            <Button buttonPlay PlayBigGreen />
            <Tippy
                className={cx('tippy-box')}
                duration={[500, 0]}
                theme="translucent"
                arrow={false}
                content="Lưu vào Thư viện"
                placement={'top'}
            >
                <div className={cx('heart')}>
                    <HeartIcon />
                </div>
            </Tippy>
            <Tippy
                content={nameAlb}
                allowHTML={true}
                className={cx('tippy-box')}
                duration={[500, 0]}
                theme="translucent"
                arrow={false}
                placement={'top'}
            >
                <div className={cx('ellipsis')}>
                    <div className={cx('dot')}></div>
                </div>
            </Tippy>
        </div>
    );
}

export default UserfulFunction;
