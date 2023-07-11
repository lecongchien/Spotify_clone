import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import MoodTool from '../Components/MoodTool/MoodTool';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const callbackFunction = (childData) => {
        console.log(childData);
    };
    return (
        <>
            <div className={cx('HI_THERE')}>
                <div className={cx('navbar')}>
                    <Navbar />
                </div>
                <div className={cx('container')}>
                    <div className={cx('contains')}>
                        <Header parentCallback={callbackFunction} />
                        {children}
                        {/* <div className={cx('line')}>
                        <div></div>
                    </div> */}
                    </div>
                </div>
                <MoodTool />
            </div>
        </>
    );
}

export default DefaultLayout;
