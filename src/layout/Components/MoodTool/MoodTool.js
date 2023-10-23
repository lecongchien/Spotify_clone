import classNames from 'classnames/bind';
import styles from './MoodTool.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faPause, faPlay, faVolumeHigh, faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { Devides, HeartLips, LoopMusic, Mix, Next, PlaylistDelay, Prev, WatchPlay } from '~/assets/Icon/Icon';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from '~/redux/actions';
import { NumberContext, Setsize } from '~/App';
import Tippy from '@tippyjs/react';
import { DataIdSong } from '~/components/Context/DataIdSong';
import { PlayAndPause } from '~/components/Context/PlayAndPause';
import { Toggle } from '~/components/Context/Toggle';
import { PlaylistContext } from '~/components/Context/PlaylistContext';
import { Count } from '~/components/Context/CountContect';
const cx = classNames.bind(styles);

function MoodTool() {
    const [IdData, setIDdata] = useState('');
    const [IdPlaylist, setIdPlaylist] = useState('');
    const data = useContext(DataIdSong);
    const Play = useContext(PlayAndPause);
    const Playlist = useContext(PlaylistContext);
    console.log(Playlist);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [rewind, setRewind] = useState(0);
    const [changeValue, setChangeValue] = useState(70);
    const [inputRange, setInputRange] = useState(0);
    const [muted, setMuted] = useState(false);
    const [initialValue, setInitialValue] = useState(70);
    const [count, setCount] = useState(0);
    const [nameSong, setNameSong] = useState('');
    const [loop, setLoop] = useState(false);
    const [mix, setMix] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [songs, setSongs] = useState();
    const handleToggle = useContext(Toggle);
    //redux
    const dispatch = useDispatch();
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            IdData === null ? audioRef.current.pause() : audioRef.current.play();
            audioRef.current.addEventListener('ended', playNextSong);
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (IdData) {
            audioRef.current.play();
            audioRef.current.addEventListener('ended', playNextSong);
            dispatch(setData([count, false]));
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [IdData]);

    useEffect(() => {
        if (!Play.setPlayAndpause) {
            audioRef.current.pause();
        } else {
            IdData === null ? audioRef.current.pause() : audioRef.current.play();
        }
    }, [Play]);

    const audioRef = useRef(null);
    const volumeRef = useRef(null);
    const reWidMusic = useRef(null);
    const prevDataRef = useRef(null);

    useEffect(() => {
        if (data !== prevDataRef.current) {
            prevDataRef.current = data;
            setIDdata(data.setIdPlaySong[0] ? data.setIdPlaySong[0]?.preview_url : data.setIdPlaySong);
            setCount(data?.setIdPlaySong[0]?.track_number - 1);
        } else if (Playlist) {
            setCount(Playlist && Playlist.playlistcontext && Playlist.playlistcontext[1]);
        }
    }, [data, Playlist]);
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleVolumeChange = (e) => {
        const sliderValue = e.target.value;
        audioRef.current.volume = volumeRef.current.value / 100;
        setChangeValue(sliderValue);
        audioRef.current.volume === 0 ? setMuted(true) : setMuted(false);
    };

    useEffect(() => {
        const person = Math.floor((currentTime / duration) * 100);
        setRewind(person);
        setInputRange(person);
    }, [currentTime, duration]);

    const handleSliderChange = (e) => {
        const sliderValue = e.target.value;
        const seekTime = (duration / 100) * sliderValue;
        audioRef.current.currentTime = seekTime;
        setRewind(sliderValue);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    //Nút điều chỉnh âm lượng hoặc tắt bài hát trong album
    const muteds = () => {
        setMuted(!muted);
        if (!muted) {
            setInitialValue(changeValue);
            audioRef.current.volume = 0;
            setChangeValue(0);
        } else {
            setChangeValue(initialValue);
            audioRef.current.volume = initialValue / 100;
        }
    };

    //Các nút chức năng sử lý prev và next các bài hát trong album
    const handlePrevious = () => {
        if (count > 0) {
            setCount(count - 1);
            dispatch(setData([count - 1, false]));
        }
    };

    const handleNext = () => {
        if (
            count < data.setIdPlaySong[1]?.tracks.items.length - 1 ||
            Playlist?.playlistcontext[0]?.tracks?.items.length - 1
        ) {
            setCount(count + 1);
            dispatch(setData([count + 1, false]));
        }
    };

    useEffect(() => {
        if (data.setIdPlaySong && data.setIdPlaySong[1]?.tracks.items.length >= 0) {
            setIDdata(data?.setIdPlaySong[1]?.tracks?.items[count]?.preview_url);
            setNameSong(data?.setIdPlaySong[1]?.tracks?.items[count]?.name);
        } else if (data.setIdPlaySong && !data.setIdPlaySong[1]) {
            setIDdata(data?.setIdPlaySong[0]?.preview_url);
            setNameSong(data?.setIdPlaySong[0]?.name);
        }
    }, [count, data.setIdPlaySong, Playlist.playlistcontext]);
    //Playlist
    useEffect(() => {
        if (Playlist?.playlistcontext && Playlist.playlistcontext[0]?.tracks) {
            setIDdata(Playlist.playlistcontext[0].tracks.items[count]?.track?.preview_url);
        }
    }, [Playlist.playlistcontext, count]);

    //Xử lý logic khi nghe xong bài hát lập tức tự chuyển sang bài hát tiếp theo
    useEffect(() => {
        audioRef.current.addEventListener('ended', playNextSong);
        return () => {
            audioRef.current.removeEventListener('ended', playNextSong);
        };
    }, [loop]);

    const playNextSong = () => {
        if (count === data?.setIdPlaySong[1]?.tracks.items.length - 1) {
            setCount(0);
        } else {
            setCount(count + 1);
        }
    };

    //Kích hoạt chế độ lặp lại bài hát
    const toggleLoop = () => {
        setLoop(!loop);
    };

    useEffect(() => {
        audioRef.current.loop = loop;
    }, [loop]);

    const mixsongs = () => {
        setMix(!mix);
        if (songs.length > 0) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            setCount(randomIndex);
        }
    };

    // useEffect(() => {
    //     if (data.setIdPlaySong && data.setIdPlaySong[1]?.tracks.items.length > 0) {
    //         const songList = [...data.setIdPlaySong[1]?.tracks.items];
    //         shuffleArray(songList);
    //         setSongs(songList);
    //     }
    // }, [data.setIdPlaySong]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const togglePlay = () => {
        setToggle(!toggle);
    };
    return (
        <>
            <div className={cx('moodTool')}>
                <Toggle.Consumer>
                    {(context) => {
                        context.toggle(toggle);
                    }}
                </Toggle.Consumer>
                <Count>
                    {(context) => {
                        context.setCounts(count);
                    }}
                </Count>
                <div className={cx('content_player')}>
                    <div className={cx('music_information')}>
                        {data.setIdPlaySong && (
                            <>
                                <div className={cx('image')}>
                                    <img
                                        src={
                                            data?.setIdPlaySong[1]?.images[2]?.url ||
                                            data?.setIdPlaySong[0]?.album?.images[2]?.url ||
                                            Playlist?.playlistcontext[0]?.tracks?.items[count]?.track?.album?.images[2]
                                                ?.url
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className={cx('title')}>
                                    <a href="" className={cx('title_name_song')}>
                                        {Playlist.playlistcontext[0] &&
                                            Playlist?.playlistcontext[0]?.tracks?.items[count]?.track?.name}
                                        {nameSong ? nameSong : data?.setIdPlaySong[0]?.name}
                                    </a>
                                    <a href="" alt="">
                                        {Playlist.playlistcontext[0] &&
                                            Playlist?.playlistcontext[0]?.tracks?.items[count]?.track?.artists[0].name}
                                        {data?.setIdPlaySong[0]?.artists[0]?.name}
                                    </a>
                                </div>
                                <HeartLips />
                                <FontAwesomeIcon icon={faImages} />
                            </>
                        )}
                    </div>
                    <div className={cx('function_seet_music')}>
                        <div className={cx('music-player')}>
                            <div className={cx('controls')}>
                                <Tippy
                                    className={cx('tippy-title')}
                                    arrow={false}
                                    placement={'top'}
                                    content="Bật trộn bài"
                                >
                                    <button onClick={mixsongs} className={cx('Mix')}>
                                        {<Mix />}
                                    </button>
                                </Tippy>
                                <Tippy className={cx('tippy-title')} arrow={false} placement={'top'} content="Trước">
                                    <button onClick={handlePrevious} className={cx('prev')}>
                                        {<Prev />}
                                    </button>
                                </Tippy>
                                <Tippy
                                    className={cx('tippy-title')}
                                    arrow={false}
                                    placement={'top'}
                                    content={!isPlaying ? 'Phát' : 'Tạm dừng'}
                                >
                                    <button className={cx('play-btn')} onClick={togglePlayPause}>
                                        <FontAwesomeIcon
                                            icon={!isPlaying || (!Play.setPlayAndpause && IdData) ? faPlay : faPause}
                                        />
                                    </button>
                                </Tippy>
                                <Tippy className={cx('tippy-title')} arrow={false} placement={'top'} content="Sau">
                                    <button onClick={handleNext} className={cx('prev')}>
                                        {<Next />}
                                    </button>
                                </Tippy>

                                <Tippy
                                    className={cx('tippy-title')}
                                    arrow={false}
                                    placement={'top'}
                                    content={!loop ? 'Bật chế độ lặp lại một bài' : 'Hủy kích hoạt chế độ lặp lại'}
                                >
                                    <button onClick={toggleLoop} className={cx('loop')}>
                                        <p style={{ color: !loop ? 'gray' : '#1db954' }}>{<LoopMusic />}</p>
                                    </button>
                                </Tippy>
                            </div>

                            <audio
                                ref={audioRef}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                id="audio-player"
                                src={IdData}
                            ></audio>

                            <div className={cx('controls_value')}>
                                <div className={cx('number_running')}>{formatTime(currentTime)}</div>
                                <div className={cx('range_run')}>
                                    <input
                                        ref={reWidMusic}
                                        onChange={handleSliderChange}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={rewind ? rewind : 0}
                                        className={cx('spotify-slider')}
                                    />
                                    <span style={{ width: `calc(${inputRange}%  + 0.5px)` }}></span>
                                </div>
                                <div className={cx('number_running')}>{formatTime(duration)}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('Tool_Users')}>
                        <div className={cx('wrap')}>
                            <Tippy
                                className={cx('tippy-title')}
                                arrow={false}
                                placement={'top'}
                                content="Chế độ xem Đang phát"
                            >
                                <button onClick={() => togglePlay()}>
                                    <WatchPlay />
                                </button>
                            </Tippy>
                            <Tippy
                                className={cx('tippy-title')}
                                arrow={false}
                                placement={'top'}
                                content="Danh sách chờ"
                            >
                                <button>
                                    <PlaylistDelay />
                                </button>
                            </Tippy>
                            <Tippy
                                className={cx('tippy-title')}
                                arrow={false}
                                placement={'top'}
                                content="Kết nối với một thiết bị"
                            >
                                <button>
                                    <Devides />
                                </button>
                            </Tippy>
                            <Tippy
                                className={cx('tippy-title')}
                                arrow={false}
                                placement={'top'}
                                content={!muted ? 'Tắt tiếng' : 'Bật tiếng'}
                            >
                                <button onClick={() => muteds()}>
                                    <FontAwesomeIcon
                                        icon={!muted ? (changeValue > 50 ? faVolumeHigh : faVolumeLow) : faVolumeXmark}
                                    />
                                </button>
                            </Tippy>
                            <div className={cx('input_range')}>
                                <div className={cx('range_run')}>
                                    <input
                                        style={{ width: '90px' }}
                                        ref={volumeRef}
                                        onChange={handleVolumeChange}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={changeValue}
                                        className={cx('spotify-slider')}
                                    />
                                    <span style={{ width: `calc(${changeValue}%  + 0.5px)` }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>{IdData === null ? <Error /> : null}</div>
        </>
    );
}

export default MoodTool;
