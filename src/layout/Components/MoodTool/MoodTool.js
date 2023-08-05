import classNames from 'classnames/bind';
import styles from './MoodTool.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faImages,
    faPause,
    faPlay,
    faSatelliteDish,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Devides, HeartLips, LoopMusic, Mix, Next, PlaylistDelay, Prev, WatchPlay } from '~/assets/Icon/Icon';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataIdSong } from '~/App';
import Tippy from '@tippyjs/react';
const cx = classNames.bind(styles);

function MoodTool() {
    const [IdData, setIDdata] = useState('');
    const data = useContext(DataIdSong);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [rewind, setRewind] = useState(0);
    const [changeValue, setChangeValue] = useState(70);
    const [inputRange, setInputRange] = useState(0);
    const [muted, setMuted] = useState(false);
    const [initialValue, setInitialValue] = useState(70);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const audioRef = useRef(null);
    const volumeRef = useRef(null);
    const reWidMusic = useRef(null);

    useEffect(() => {
        if (data) {
            setIDdata(data.setIdPlaySong[0]?.preview_url);
        }
    }, [data]);

    const handleTimeUpdate = (ease) => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleVolumeChange = (e) => {
        const sliderValue = e.target.value;
        audioRef.current.volume = volumeRef.current.value / 100;
        setChangeValue(sliderValue);
        // setHandeVolumn(sliderValue);
        console.log((audioRef.current.volume = volumeRef.current.value / 100));
    };

    useEffect(() => {
        const person = Math.floor((currentTime / duration) * 100);
        setRewind(person);
        setInputRange(person);
    }, [currentTime, duration]);

    const handleSliderChange = (e) => {
        const sliderValue = e.target.value;
        const seektime = (duration / 100) * sliderValue;
        audioRef.current.currentTime = seektime;
        setRewind(sliderValue);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    //tắt âm thanh
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

    return (
        <div className={cx('moodTool')}>
            <div className={cx('content_player')}>
                <div className={cx('music_information')}>
                    <div className={cx('image')}>
                        <img src={data?.setIdPlaySong[1]?.images[2]?.url} alt="" />
                    </div>
                    <div className={cx('title')}>
                        <a href="" className={cx('title_name_song')}>
                            {data?.setIdPlaySong[0]?.name}
                        </a>
                        <a href="" alt="">
                            {data?.setIdPlaySong[0]?.artists[0]?.name}
                        </a>
                    </div>
                    <HeartLips />
                    <FontAwesomeIcon icon={faImages} />
                </div>
                <div className={cx('function_seet_music')}>
                    <div className={cx('music-player')}>
                        <div className={cx('controls')}>
                            <Tippy className={cx('tippy-title')} arrow={false} placement={'top'} content="Bật trộn bài">
                                <button className={cx('Mix')}>{<Mix />}</button>
                            </Tippy>
                            <Tippy className={cx('tippy-title')} arrow={false} placement={'top'} content="Trước">
                                <button className={cx('prev')}>{<Prev />}</button>
                            </Tippy>
                            <Tippy
                                className={cx('tippy-title')}
                                arrow={false}
                                placement={'top'}
                                content={!isPlaying ? 'Phát' : 'Tạm dừng'}
                            >
                                <button className={cx('play-btn')} onClick={togglePlayPause}>
                                    <FontAwesomeIcon icon={!isPlaying ? faPlay : faPause} />
                                </button>
                            </Tippy>
                            <Tippy className={cx('tippy-title')} arrow={false} placement={'top'} content="Sau">
                                <button className={cx('prev')}>{<Next />}</button>
                            </Tippy>

                            <Tippy
                                className={cx('tippy-title')}
                                arrow={false}
                                placement={'top'}
                                content="Kích hoạt chế độ lặp lại"
                            >
                                <button className={cx('prev')}>{<LoopMusic />}</button>
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
                                    value={rewind}
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
                            <button>
                                <WatchPlay />
                            </button>
                        </Tippy>
                        <Tippy className={cx('tippy-title')} arrow={false} placement={'top'} content="Danh sách chờ">
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
                                <FontAwesomeIcon icon={!muted ? faVolumeHigh : faVolumeXmark} />
                            </button>
                        </Tippy>
                        <div className={cx('range_run')} style={{ margin: '0 0 0 10px' }}>
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
    );
}

export default MoodTool;
