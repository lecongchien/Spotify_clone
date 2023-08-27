import classNames from 'classnames/bind';
import styles from './playsongs.module.scss';
import { DataIdSong, NumberContext, PlayAndPause } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Explicit, HeartLips } from '~/assets/Icon/Icon';
import { useSelector } from 'react-redux';
import { ThemeContext } from '~/components/themeContext/themeContext';
import Beat from '~/assets/image/play.gif';
import { useCallback, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Playsongs({ component }) {
    const [handleMouse, setHandleMouse] = useState();
    const [playStates, setPlayStates] = useState([]);
    const [Idsong, setIdSong] = useState([]);
    const [toggle, setToggle] = useState('');
    const [handleToggle, sethandleToggle] = useState(false);

    const data = useSelector((state) => state.data);
    const togglePlay = (index) => {
        sethandleToggle(index);
        const newPlayStates = component.tracks?.items.map((state, i) => {
            const run = [state, component];
            if (index === i) {
                setIdSong(run);
                const a = { ...state, isPlaying: !state.isPlaying }; // Đảo ngược trạng thái play/
                setToggle(a.isPlaying); // Đảo ngược trạng thái play/pause
                return a;
            } else {
                return { ...state, isPlaying: false }; // Đảo ngược trạng thái play/pause
            }
        });
        setPlayStates(newPlayStates);
    };
    console.log(data);

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
                const handle = playStates[index] && playStates[index]?.track_number === data[0] + 1;
                return (
                    <>
                        <DataIdSong.Consumer>
                            {(context) => {
                                context.ID(Idsong);
                            }}
                        </DataIdSong.Consumer>
                        <PlayAndPause.Consumer>
                            {(context) => {
                                context.Toggle(toggle);
                            }}
                        </PlayAndPause.Consumer>
                        <tr
                            className={cx('see_quest')}
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseLeave={() => MouseLeave()}
                        >
                            <td>
                                {handleMouse && handleMouse[index] ? (
                                    <>
                                        <FontAwesomeIcon
                                            onClick={() => togglePlay(index)}
                                            icon={handle ? faPause : faPlay}
                                        />
                                    </>
                                ) : (
                                    <>{!handle ? <>{index + 1}</> : <img src={Beat} />}</>
                                )}
                            </td>
                            <td>
                                <span className={cx('title')}>
                                    <a
                                        style={{
                                            color: handle ? '#1ed760' : '#ccc',
                                        }}
                                        href=""
                                        className={cx('title_name_song')}
                                    >
                                        {/* {logNumberSong.setNb === element.preview_url && <>
                                        
                                        </>} */}
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
