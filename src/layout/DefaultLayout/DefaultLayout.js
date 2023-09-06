import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import MoodTool from '../Components/MoodTool/MoodTool';
import { useContext, useEffect, useRef } from 'react';
import { Setsize, Toggle } from '~/App';
import Expectations from '../Components/Expectations/Expectations';
import NetworkStatusNotifier from '../NetworkStatusNotifier/NetworkStatusNotifier';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const handelSize = useRef(null);
    const callbackFunction = (childData) => {
        console.log(childData);
    };

    const sizeIn = useContext(Setsize);
    const toggle = useContext(Toggle);
    const navbar = useRef();
    useEffect(() => {
        if (handelSize.current) {
            if (sizeIn.setSizeApp) {
                handelSize.current.style.flex = '0 0 50%';
                navbar.current.style.flex = '0 0 50%';
            } else {
                handelSize.current.style.flex = '0 0 75%';
                navbar.current.style.flex = '0 0 25%';
                if (toggle.setNb) {
                    handelSize.current.style.flex = '0 0 45%';
                } else {
                    handelSize.current.style.flex = '0 0 75%';
                    navbar.current.style.flex = '0 0 25%';
                }
            }
        }
    }, [sizeIn]);

    return (
        <>
            <div className={cx('HI_THERE')}>
                <NetworkStatusNotifier />
                <div ref={navbar} className={cx('navbar')}>
                    <Navbar />
                </div>
                <div ref={handelSize} className={cx('container')}>
                    <div className={cx('contains')}>
                        <Header parentCallback={callbackFunction} />
                        {children}
                    </div>
                </div>
                <Expectations />
            </div>
            <MoodTool />
        </>
    );
}

export default DefaultLayout;
