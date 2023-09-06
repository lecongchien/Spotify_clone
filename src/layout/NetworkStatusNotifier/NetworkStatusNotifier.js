import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './NetWork.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const NetworkStatusNotifier = () => {
    const [isOnline, setIsOnline] = useState(true);

    const saveNetworkStatus = (status) => {
        localStorage.setItem('networkStatus', status);
    };

    useEffect(() => {
        const handleNetworkChange = () => {
            setIsOnline(navigator.onLine);
            if (!navigator.onLine) {
                saveNetworkStatus('offline');
            } else {
                saveNetworkStatus('online');
            }
        };

        window.addEventListener('offline', handleNetworkChange);
        window.addEventListener('online', handleNetworkChange);

        const savedStatus = localStorage.getItem('networkStatus');
        if (savedStatus === 'offline') {
            setIsOnline(false);
        }

        return () => {
            window.removeEventListener('offline', handleNetworkChange);
            window.removeEventListener('online', handleNetworkChange);
        };
    }, []);

    return (
        <>
            {!isOnline && (
                <div className={cx('offline_notification')}>
                    <div className={cx('warring')}>
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                    </div>
                    <p>Network error occurred.</p>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default NetworkStatusNotifier;
