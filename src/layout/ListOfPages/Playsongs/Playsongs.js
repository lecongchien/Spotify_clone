import classNames from 'classnames/bind';
import styles from './playsongs.module.scss';
import { DataIdSong } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Explicit, HeartLips } from '~/assets/Icon/Icon';
import { ThemeContext } from '~/components/themeContext/themeContext';
import { useCallback, useEffect, useState, useContext } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

function Playsongs({ component }) {
    const [handleMouse, setHandleMouse] = useState();
    const [playStates, setPlayStates] = useState(false);
    const [Idsong, setIdSong] = useState('');
    const [runtoggle, setRuntoggle] = useState(false);
    const theme = useContext(ThemeContext);
    const togglePlay = (index) => {
        setRuntoggle(runtoggle === false ? true : false);

        const newPlayStates = component.tracks?.items.map((state, i) => {
            const run = [state, component];
            if (index === i) {
                setIdSong(run);
                return true;
            } else {
                return false;
            }
        });

        setPlayStates(newPlayStates);
    };

    const handleMouseOver = (index) => {
        const changeMouse = component.tracks?.items.map((e, i) => {
            if (index === i) {
                return true;
            } else {
                return false;
            }
        });
        setHandleMouse(changeMouse);
    };

    const MouseLeave = () => {
        setHandleMouse(true);
    };

    return (
        <>
            {component.tracks?.items.map((element, index) => {
                const milliseconds = element.duration_ms;
                const seconds = Math.floor(milliseconds / 1000);
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;

                return (
                    <>
                        <DataIdSong.Consumer>
                            {(context) => {
                                context.ID(Idsong);
                            }}
                        </DataIdSong.Consumer>
                        <tr onMouseOver={() => handleMouseOver(index)} onMouseLeave={() => MouseLeave()}>
                            <td>
                                {handleMouse && handleMouse[index] ? (
                                    <>
                                        <FontAwesomeIcon
                                            onClick={() => togglePlay(index)}
                                            icon={playStates && playStates[index] && runtoggle ? faPause : faPlay}
                                        />
                                    </>
                                ) : (
                                    <>{index + 1}</>
                                )}
                            </td>
                            <td>
                                <span className={cx('title')}>
                                    <a href="" className={cx('title_name_song')}>
                                        {element.name}
                                    </a>
                                </span>
                                <br />
                                <span className={cx('explicit')}>
                                    {element.explicit === true && <Explicit />}
                                    <a href="" className={cx('title_name_song')}>
                                        {element.artists[0].name}
                                    </a>
                                </span>
                            </td>
                            <td>
                                {<HeartLips />}
                                <p>{minutes + ':' + remainingSeconds}</p>
                                {handleMouse && handleMouse[index] && <FontAwesomeIcon icon={faEllipsis} />}
                            </td>
                        </tr>
                    </>
                );
            })}
        </>
    );
}

export default Playsongs;
