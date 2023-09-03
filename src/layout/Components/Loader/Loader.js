import styles from './Loader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Loader() {
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('blobs')}>
                    <div className={cx('blob-center')}></div>
                    <div className={cx('blob')}></div>
                    <div className={cx('blob')}></div>
                    <div className={cx('blob')}></div>
                    <div className={cx('blob')}></div>
                    <div className={cx('blob')}></div>
                    <div className={cx('blob')}></div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </>
    );
}

export default Loader;
