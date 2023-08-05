import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import MoodTool from '../Components/MoodTool/MoodTool';
import { useContext, useEffect, useRef } from 'react';
import { Setsize } from '~/App';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const handelSize = useRef(null);
    const callbackFunction = (childData) => {
        console.log(childData);
    };

    const sizeIn = useContext(Setsize);

    useEffect(() => {
        if (handelSize.current) {
            if (sizeIn.setSizeApp) {
                handelSize.current.style.gridTemplateColumns = '1.7fr 2fr';
            } else {
                handelSize.current.style.gridTemplateColumns = '0.6fr 2fr';
            }
        }
    }, [sizeIn]);

    return (
        <>
            <div ref={handelSize} className={cx('HI_THERE')}>
                <div className={cx('navbar')}>
                    <Navbar />
                </div>
                <div className={cx('container')}>
                    <div className={cx('contains')}>
                        <Header parentCallback={callbackFunction} />
                        {children}
                    </div>
                </div>
            </div>
            <MoodTool />
        </>
    );
}

export default DefaultLayout;
