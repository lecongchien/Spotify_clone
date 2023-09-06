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
    const [clickStates, setClickStates] = useState([]);
    const nameGenres = [
        {
            name: 'pop',
            id: 6,
        },
        {
            name: 'dance',
            id: 20,
        },
        {
            name: 'k-pop',
            id: 20,
        },
        {
            name: 'jazz',
            id: 20,
        },
        {
            name: 'rock',
            id: 20,
        },
        {
            name: 'classical',
            id: 20,
        },
        {
            name: 'gospel',
            id: 20,
        },
        {
            name: 'funk',
            id: 20,
        },
        {
            name: 'blues',
            id: 20,
        },
        {
            name: 'folk',
            id: 20,
        },
    ];

    useEffect(() => {
        const reload = async () => {
            try {
                const recommendationsByGenre = {};

                for (let i = 0; i < nameGenres.length; i++) {
                    const genre = nameGenres[i].name;
                    const ID = nameGenres[i].id;
                    const response = await axios.get(
                        `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&limit=${ID}`,
                        theme.artistsParmester,
                    );
                    const tracks = response.data.tracks;

                    if (!recommendationsByGenre[genre]) {
                        recommendationsByGenre[genre] = [];
                    }

                    recommendationsByGenre[genre].push(...tracks);
                }

                setRecommendations(recommendationsByGenre);
            } catch (error) {
                console.log(error);
            }
        };

        reload();
    }, [theme]);

    const play = (e, i, genre) => {
        const updatedRecommendations = { ...recommendations };

        for (const key in updatedRecommendations) {
            if (key === genre) {
                updatedRecommendations[key] = updatedRecommendations[key].map((item, index) => {
                    if (index === i) {
                        setError(e.preview_url);
                        setRecome([item]);
                        const updatedItem = { ...item, isPlaying: !item.isPlaying };
                        setToggle(updatedItem.isPlaying);
                        return updatedItem;
                    } else {
                        return { ...item, isPlaying: false };
                    }
                });
            } else {
                updatedRecommendations[key] = updatedRecommendations[key].map((item) => ({
                    ...item,
                    isPlaying: false,
                }));
            }
        }

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

    const hanldeBoxAll = (index) => {
        const newClickStates = [...clickStates]; // Sao chép mảng clickStates
        console.log(newClickStates);
        newClickStates[index] = !newClickStates[index]; // Đảo ngược trạng thái click
        setClickStates(newClickStates); // Cập nhật mảng clickStates mới
    };
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
                    <h3>Please choose another song</h3>
                </div>
                <div className={cx('song_items')}>
                    {Object.keys(recommendations).map((genre, index) => (
                        <>
                            <div className={cx('content_bo')}>
                                <div className={cx('header_content')}>
                                    <h2>{genre === 'pop' ? null : genre}</h2>
                                    <p onClick={() => hanldeBoxAll(index)}>{genre === 'pop' ? null : 'Hiện tất cả'}</p>
                                </div>
                                <div
                                    className={cx(
                                        genre === 'pop' ? 'container' : clickStates[index] ? 'change' : 'content_onder',
                                    )}
                                >
                                    {recommendations &&
                                        recommendations[genre].map((e, i) => {
                                            return (
                                                <>
                                                    <div
                                                        className={cx(
                                                            genre !== 'pop'
                                                                ? !e.isPlaying
                                                                    ? 'box'
                                                                    : 'handle_box'
                                                                : !e.isPlaying
                                                                ? 'content_box'
                                                                : 'hande_content',
                                                        )}
                                                        key={i}
                                                        onMouseEnter={() => handleMouseEnter(e)}
                                                        onMouseLeave={() => handleMouseLeave()}
                                                    >
                                                        <Button to={`/albums/${e.album.id}`} itemsong>
                                                            <div className={cx('content_info')}>
                                                                <div
                                                                    className={cx(
                                                                        genre === 'rock' ? 'cricle_image' : 'images',
                                                                    )}
                                                                >
                                                                    <img
                                                                        loading="lazy"
                                                                        src={e?.album?.images[1]?.url}
                                                                        alt={e.album.name}
                                                                    />
                                                                </div>
                                                                {genre !== 'pop' ? null : <h2>{e.artists[0].name}</h2>}
                                                                {genre === 'pop' ? null : (
                                                                    <div className={cx('info_art')}>
                                                                        <h3>{e.artists[0].name}</h3>
                                                                        <p>{e.album.name}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Button>
                                                        <button
                                                            className={cx('cricle_Green_Play')}
                                                            onClick={() => play(e, i, genre)}
                                                        >
                                                            <FontAwesomeIcon icon={e.isPlaying ? faPause : faPlay} />
                                                        </button>
                                                    </div>
                                                </>
                                            );
                                        })}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <Lyric />
        </div>
    );
}

export default ListBox;
