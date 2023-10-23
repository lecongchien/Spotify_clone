import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import MoodTool from '../Components/MoodTool/MoodTool';
import { useContext, useEffect, useRef } from 'react';
import Expectations from '../Components/Expectations/Expectations';
import NetworkStatusNotifier from '../NetworkStatusNotifier/NetworkStatusNotifier';
import { Setsize } from '~/components/Context/Setsize';
import { Toggle } from '~/components/Context/Toggle';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const handelSize = useRef(null);
    const callbackFunction = (childData) => {
        console.log(childData);
    };

    const sizeIn = useContext(Setsize);
    const toggle = useContext(Toggle);
    const navbar = useRef();
    const righttab = useRef();

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
                    righttab.current.style.display = 'block';
                } else {
                    handelSize.current.style.flex = '0 0 75%';
                    navbar.current.style.flex = '0 0 25%';
                    righttab.current.style.display = 'none';
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
        
                <Expectations name={righttab} />
            </div>
            <MoodTool />
        </>
    );
}

export default DefaultLayout;
