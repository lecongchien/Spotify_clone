import classNames from 'classnames/bind';
import styles from './playsongs.module.scss';
import { NumberContext, ToggleALL } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Explicit, HeartLips } from '~/assets/Icon/Icon';
import { useSelector } from 'react-redux';
import { ThemeContext } from '~/components/themeContext/themeContext';
import Beat from '~/assets/image/play.gif';
import { useCallback, useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import { DataIdSong } from '~/components/Context/DataIdSong';
import { PlayAndPause } from '~/components/Context/PlayAndPause';
import { PlaylistContext } from '~/components/Context/PlaylistContext';
import { useLocation } from 'react-router-dom';
import { Count } from '~/components/Context/CountContect';

const cx = classNames.bind(styles);

function Playsongs({ component, componentPlaylist }) {
    const [handleMouse, setHandleMouse] = useState();
    const [handleMousePlaylist, sethandleMousePlaylist] = useState();
    const [playStates, setPlayStates] = useState([]);
    const [playlistStates, setPlayListStates] = useState([]);
    const [Idsong, setIdSong] = useState([]);
    const [idSongPlaylist, setIdSongsPlaylist] = useState([]);
    const [toggle, setToggle] = useState('');
    const [toggleplaylist, setTogglePlaylist] = useState('');
    //
    const setcout = useContext(Count);
    const locations = useLocation();
    const allLocation = locations.pathname;
    const setIdPlaylist = allLocation.split('/');
    const IdPlaylist = setIdPlaylist[1];
    const data = useSelector((state) => state.data);
    const togglePlay = (index) => {
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

    const togglePlayList = (index) => {
        const newPlaylists = componentPlaylist?.tracks?.items?.map((element, i) => {
            if (index === i) {
                const b = { ...element, isPlaying: !element.isPlaying };
                setTogglePlaylist(b.isPlaying);
                const run = [componentPlaylist, index];
                setIdSongsPlaylist(run);
                return b;
            } else {
                return { ...element, isPlaying: false };
            }
        });
        setPlayListStates(newPlaylists);
    };

    useEffect(() => {}, []);
    const handleMouseOver = (index) => {
        const changeMouse = component.tracks?.items.map((e, i) => {
            if (index === i) {
                return true;
            } else {
                return false;
            }
        });
        const changeMousePlaylist = componentPlaylist?.tracks?.items?.map((element, i) => {
            if (index === i) {
                return true;
            } else {
                return false;
            }
        });
        setHandleMouse(changeMouse);
        sethandleMousePlaylist(changeMousePlaylist);
    };

    const MouseLeave = () => {
        setHandleMouse(true);
        sethandleMousePlaylist(true);
    };

    return (
        <>
            <DataIdSong.Consumer>
                {(context) => {
                    context.ID(Idsong);
                }}
            </DataIdSong.Consumer>
            <PlayAndPause.Consumer>
                {(context) => {
                    context.Toggle(toggle || toggleplaylist);
                }}
            </PlayAndPause.Consumer>
            <PlaylistContext>
                {(context) => {
                    context.Play(idSongPlaylist);
                }}
            </PlaylistContext>
            {component && (
                <>
                    {component.tracks?.items.map((element, index) => {
                        const milliseconds = element.duration_ms;
                        const seconds = Math.floor(milliseconds / 1000);
                        const minutes = Math.floor(seconds / 60);
                        const remainingSeconds = seconds % 60;
                        const handle = playStates[index] && playStates[index]?.track_number === data[0] + 1;
                        return (
                            <>
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
            )}
            {componentPlaylist && (
                <>
                    {componentPlaylist?.tracks?.items?.map((element, index) => {
                        // console.log(element);
                        //date
                        const dateString = element.added_at;
                        const date = new Date(dateString);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        //hour
                        const milliseconds = element.track.duration_ms;
                        const seconds = Math.floor(milliseconds / 1000);
                        const minutes = Math.floor(seconds / 60);
                        const remainingSeconds = seconds % 60;
                        //
                        const run = setcout.setCounthandle === index;
                        return (
                            <tr
                                className={cx('see_quest')}
                                onMouseOver={() => handleMouseOver(index)}
                                onMouseLeave={() => MouseLeave()}
                                style={{ gridTemplateColumns: '0.3fr 1.5fr 1fr 0.5fr 1fr' }}
                            >
                                <td>
                                    {handleMousePlaylist && handleMousePlaylist[index] ? (
                                        <>
                                            <FontAwesomeIcon
                                                onClick={() => togglePlayList(index)}
                                                icon={run ? faPause : faPlay}
                                            />
                                        </>
                                    ) : (
                                        <>{!run ? <>{index + 1}</> : <img src={Beat} />}</>
                                    )}
                                </td>
                                <td style={{ display: 'flex' }}>
                                    <div className={cx('image')}>
                                        <img src={element.track.album.images[2].url} />
                                    </div>
                                    <div className={cx('context-text')}>
                                        <span className={cx('title')}>
                                            <a href="" className={cx('title_name_song')}>
                                                {element.track.name}
                                            </a>
                                        </span>
                                        <br />
                                        <span className={cx('explicit')}>
                                            <a href="" className={cx('title_name_song')}>
                                                {element.track.artists[0].name}
                                                {element.track.artists[1] && ', ' + element.track.artists[1].name}
                                            </a>
                                        </span>
                                    </div>
                                </td>
                                <td style={{ padding: '0 0 0 20px', whiteSpace: 'normal' }}>
                                    {element.track.album.name}
                                </td>
                                <td style={{ padding: '0 0 0 20px', whiteSpace: 'nowrap' }}>
                                    {month + ' ' + 'th' + ' ' + day + ', ' + year}
                                </td>
                                <td>
                                    <p>{minutes + ':' + remainingSeconds}</p>
                                </td>
                            </tr>
                        );
                    })}
                </>
            )}
        </>
    );
}

export default Playsongs;
