import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import NameUser from '../NameUser/NameUser';
const cx = classNames.bind(styles);

function Button({
    to,
    href,
    nav,
    dflex = false,
    title = false,
    icon = false,
    icon2 = false,
    icon3 = false,
    heart = false,
    button = false,
    active = false,
    user = false,
    settingapp = false,
    buttonPlay = false,
    PlayBigGreen = false,
    smallButton = false,
    itemsong = false,
    hover = false,
    onClick = false,
    children,
    ...pastProps
}) {
    let Component = 'div';
    const props = {
        ...pastProps,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    } else if (nav) {
        props.to = nav;
        Component = NavLink;
    }

    const [playMS, setPlayMusic] = useState(true);
    const play = () => {
        setPlayMusic(!playMS);
    };

    const className = cx('', {
        dflex,
        heart,
        active,
        button,
        user,
        icon2,
        icon3,
        settingapp,
        smallButton,
        itemsong,
        hover,
    });

    const changeSizeCricle = cx('', {
        PlayBigGreen,
    });

    const divstyles = {
        fontWeight: 'bold',
    };

    //
    return (
        <Component onClick={onClick} className={className} {...props}>
            {children}
            {dflex && (
                <>
                    {icon}
                    <p>{title}</p>
                </>
            )}
            {heart && (
                <>
                    <img src={icon} alt="heart" />
                    <p>{title}</p>
                </>
            )}
            {button ? (
                <>
                    {active ? (
                        <Tippy
                            content="Nâng cấp lên Premium"
                            delay={[100, 0]}
                            placement={'bottom'}
                            arrow={false}
                            followCursor="initial"
                            plugins={[followCursor]}
                        >
                            <button className={cx('title')} type="button">
                                {title}
                            </button>
                        </Tippy>
                    ) : (
                        <button className={cx('icon')} type="button">
                            {icon}
                        </button>
                    )}
                </>
            ) : null}
            {user ? (
                <>
                    <Tippy
                        content={<strong style={divstyles}>{<NameUser />}</strong>}
                        duration={[500, 0]}
                        arrow={false}
                    >
                        <div className={cx('box-user')}>
                            <Tippy
                                content={<NameUser />}
                                delay={[500]}
                                animation={'scale'}
                                arrow={false}
                                followCursor={true}
                                plugins={[followCursor]}
                            >
                                <div className={cx('users')}>{icon}</div>
                            </Tippy>
                            <div className={cx('username')}>{title}</div>
                        </div>
                    </Tippy>
                </>
            ) : null}

            {settingapp ? (
                <>
                    <div className={className}>
                        <div className={cx('contains_info')}>
                            <div className={cx('users')}>{icon}</div>
                            <div className={cx('username')}>{title}</div>
                        </div>
                    </div>
                </>
            ) : null}

            {buttonPlay ? (
                <>
                    <div className={changeSizeCricle} onClick={() => play()}>
                        <FontAwesomeIcon icon={playMS ? faPlay : faPause} />
                    </div>
                </>
            ) : null}
        </Component>
    );
}

export default Button;
