import classNames from 'classnames/bind';
import styles from './ListBox.module.scss';
import Button from '~/components/button';
import { ThemeContext } from '~/components/themeContext/themeContext';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { DataIdSong, PlayAndPause } from '~/App';
import Lyric from '~/pages/Lyric/Lyric';
import ColorThief from 'colorthief';

const cx = classNames.bind(styles);

function ListBox() {
    const theme = useContext(ThemeContext);
    const [recommendations, setRecommendations] = useState('');
    const [recome, setRecome] = useState('');
    const [toggle, setToggle] = useState('');
    const [images, setImages] = useState('');
    const [color, setColor] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState();
    const hadleError = useRef();
    useEffect(() => {
        setTimeout(() => {
            const reload = async () => {
                try {
                    const response = await axios
                        .get(
                            'https://api.spotify.com/v1/recommendations?seed_genres=pop&limit=6',
                            theme.artistsParmester,
                        )
                        .then((response) => {
                            setRecommendations(response.data.tracks);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } catch (error) {
                    console.log(error);
                }
            };
            reload();
        }, 500);
    }, [theme]);

    const play = (e, i) => {
        setError(e.preview_url);
        const updatedRecommendations = recommendations.map((item, index) => {
            const run = [item];
            if (index === i) {
                setRecome(run);
                const a = { ...item, isPlaying: !item.isPlaying }; // Đảo ngược trạng thái play/
                setToggle(a.isPlaying);
                return a;
            } else {
                return { ...item, isPlaying: false };
            }
        });

        setRecommendations(updatedRecommendations);
    };

    const handleMouseEnter = (e) => {
        setImages(e.album.images[1].url);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = `${images}`;
        image.onload = () => {
            const colorThief = new ColorThief();
            setColor(colorThief.getColor(image));
        };
    }, [images]);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 12) {
            setTimeOfDay('Chào buổi sáng');
        } else if (currentHour >= 12 && currentHour <= 18) {
            setTimeOfDay('Chào buổi chiều');
        } else {
            setTimeOfDay('Chào buổi tối');
        }
    }, []);

    useEffect(() => {
        const timerID = setTimeout(() => {
            if (error === null) {
                hadleError.current.style.opacity = 1;
                hadleError.current.style.visibility = 'visible';
                hadleError.current.style.transform = 'translateX(0px)';
            } else {
                hadleError.current.style.opacity = 0;
                hadleError.current.style.visibility = 'hidden';
                hadleError.current.style.transform = 'translateX(100px)';
            }
        }, 1000);
        return () => clearTimeout(timerID);
    }, [error, hadleError]);

    return (
        <div
            className={cx('List-Box')}
            style={
                isHovered
                    ? color && {
                          backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                      }
                    : {
                          backgroundColor: '#ccc',
                      }
            }
        >
            <div className={cx('header')}>
                <p>{timeOfDay}</p>
            </div>
            <PlayAndPause.Consumer>
                {(context) => {
                    context.Toggle(toggle);
                }}
            </PlayAndPause.Consumer>
            <div className={cx('container')}>
                <DataIdSong.Consumer>
                    {(context) => {
                        context.ID(recome);
                    }}
                </DataIdSong.Consumer>
                <div ref={hadleError} className={cx('error')}>
                    <p>Please choose another song</p>
                </div>
                <div className={cx('song_items')}>
                    {recommendations &&
                        recommendations.map((e, i) => {
                            return (
                                <>
                                    <div
                                        className={cx(!e.isPlaying ? 'content_box' : 'hande_content')}
                                        key={i}
                                        onMouseEnter={() => handleMouseEnter(e)}
                                        onMouseLeave={() => handleMouseLeave()}
                                    >
                                        <Button to={`/albums/${e.album.id}`} itemsong>
                                            <div className={cx('content_info')}>
                                                <div className={cx('images')}>
                                                    <img
                                                        loading="lazy"
                                                        src={e.album.images[1].url}
                                                        alt={e.album.name}
                                                    />
                                                </div>
                                                <h2>{e.artists[0].name}</h2>
                                            </div>
                                        </Button>
                                        <button className={cx('cricle_Green_Play')} onClick={() => play(e, i)}>
                                            <FontAwesomeIcon icon={e.isPlaying ? faPause : faPlay} />
                                        </button>
                                    </div>
                                </>
                            );
                        })}
                </div>
            </div>
            <Lyric />
        </div>
    );
}

export default ListBox;
