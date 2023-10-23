import classNames from 'classnames/bind';
import styles from './ListBox.module.scss';
import Button from '~/components/button';
import { ThemeContext } from '~/components/themeContext/themeContext';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import ColorThief from 'colorthief';
import { DataID, DataIdSong } from '~/components/Context/DataIdSong';
import { PlayAndPause } from '~/components/Context/PlayAndPause';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ListBox() {
    const theme = useContext(ThemeContext);
    const { ID } = useParams(null);
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
    const [DataArtist, setDataArtist] = useState([]);

    const FeaturedPlaylist = useCallback(async () => {
        const playlist = await axios
            .get('https://api.spotify.com/v1/browse/featured-playlists?country=VN', theme.artistsParmester)
            .then((responde) => {
                setDataArtist(responde.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [theme]);

    console.log(ID);
    useEffect(() => {
        FeaturedPlaylist();
    }, [FeaturedPlaylist]);

    const handleMouseEnter = (e) => {
        setImages(e.images[0]?.url);
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
                hadleError.current.style.transform = 'translateY(0px)';
            } else {
                hadleError.current.style.opacity = 0;
                hadleError.current.style.visibility = 'hidden';
                hadleError.current.style.transform = 'translateY(-50px)';
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
                    <div>
                        <h2 className={cx('title_country')}>Nhạc Việt</h2>
                        <div className={cx('container_playlist')}>
                            {DataArtist?.playlists?.items?.map((element, index) => {
                                console.log(element);
                                return (
                                    <div
                                        className={cx('Playlist_content')}
                                        onMouseEnter={() => handleMouseEnter(element)}
                                        onMouseLeave={() => handleMouseLeave(element)}
                                    >
                                        <Button to={`/playlists/${element?.id}`} itemsong>
                                            <div className={cx('content_info')}>
                                                <div className={cx('images')}>
                                                    <img
                                                        loading="lazy"
                                                        src={element?.images[0]?.url}
                                                        alt={element?.name}
                                                    />
                                                </div>
                                                <h2>{element?.name}</h2>
                                            </div>
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListBox;
