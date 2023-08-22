import { faCircle, faClock, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import styles from './ListOfPages.module.scss';
import ColorThief from 'colorthief';
import BoxcardMusic from '~/components/BoxcardMusic/BoxcardMusic';
import UserfulFunction from '~/components/UserfulFunction/UserfulFunction';
import { ThemeContext } from '~/components/themeContext/themeContext';
import axios from 'axios';
import Playsongs from './Playsongs/Playsongs';
const cx = classNames.bind(styles);

function ListOfPages() {
    const { ID } = useParams(null);
    const [component, setComponet] = useState([null]);
    const theme = useContext(ThemeContext);

    const fetchProducts = useCallback(async () => {
        const reload = await axios
            .get(`https://api.spotify.com/v1/albums/${ID}`, theme.artistsParmester)
            .then((response) => {
                setComponet(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [ID, theme]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const [color, setColor] = useState(null);

    const infoToAlist = {
        imageSize: component.images && component.images[0].url,
        imageBig: component.images && component.images[1].url,
        imagesmall: component.images && component.images[2].url,
        type: component.type,
        nameAlbum: component.name,
        numberOfTrack: component.total_tracks,
        nameArtist: component.artists && component.artists[0].name,
        day: component.release_date && component.release_date.slice(0, 4),
        Icon: <FontAwesomeIcon icon={faCircle} />,
        hoursAndMinutes: [Math.floor(component.popularity / 60), component.popularity % 60],
        copyrights: [
            {
                name: component?.copyrights?.[0]?.text,
                type: component?.copyrights?.[0]?.type,
            },
            {
                name: component?.copyrights?.[1]?.text,
                type: component?.copyrights?.[1]?.type,
            },
        ],
        releaseYearL: {
            day: component.release_date && component.release_date.split('-', 3),
        },
    };
    const {
        releaseYearL,
        copyrights,
        numberOfTrack,
        imageSize,
        imageBig,
        imagesmall,
        type,
        nameAlbum,
        nameArtist,
        day,
        Icon,
        hoursAndMinutes,
    } = infoToAlist;

    const overRall = ' ' + ', ' + hoursAndMinutes[0] + ' ' + 'giờ' + ' ' + hoursAndMinutes[1] + ' ' + 'phút';

    useEffect(() => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = `${imageBig}`;
        image.onload = () => {
            const colorThief = new ColorThief();
            setColor(colorThief.getColor(image));
        };
    }, [imageBig]);

    //change size images

    const changesize = useRef();
    const mousesmile = useRef();

    const handelImags = () => {
        changesize.current.style.visibility = 'visible';
        mousesmile.current.style.transform = 'scale(1) translateY(0)';
        mousesmile.current.style.transition = '500ms ease';
        mousesmile.current.style.opacity = '1';
        changesize.current.style.opacity = '1';
    };

    const outImages = () => {
        changesize.current.style.visibility = 'hidden';
        changesize.current.style.opacity = '0';
        mousesmile.current.style.transform = 'scale(.4) translateY(400px)';
        mousesmile.current.style.transition = '450ms ease';
        mousesmile.current.style.opacity = '0';
    };

    const outside = () => {
        if ((changesize.current.style.visibility = 'visible')) {
            changesize.current.style.visibility = 'hidden';
            changesize.current.style.opacity = '0';
            mousesmile.current.style.transform = 'scale(.4) translateY(400px)';
            mousesmile.current.style.transition = '450ms ease';
            mousesmile.current.style.opacity = '0';
        }
    };

    const handleChildClick = (event) => {
        event.stopPropagation();
        return false;
    };

    return (
        <>
            <div
                style={
                    color && {
                        backgroundImage: `linear-gradient(#3f3f3f 0, rgb(${color[0]}, ${color[1]}, ${color[2]}) 100%)`,
                        boxShadow: `
                        0px 55px 124px 28px rgb(${color[0]} ${color[1]} ${color[2]} / 34%)`,
                    }
                }
                className={cx('box_content_music')}
            >
                <div className={cx('header')}>
                    <div className={cx('image-artist')} onClick={() => handelImags()}>
                        <img src={imageBig} alt="" />
                    </div>
                    <div className={cx('album-info-by-artist')}>
                        <h4>{type}</h4>
                        <h2>{nameAlbum}</h2>
                        <div>
                            <img src={imagesmall} alt="2" />
                            <a src="/">{nameArtist}</a>
                            {Icon}
                            <p>{day}</p>
                            {Icon}
                            <p className={cx('number-song')}>{numberOfTrack + ' ' + 'bài hát' + ''} </p>
                            <p className={cx('time')}>{overRall}</p>
                        </div>
                    </div>
                </div>
                <div ref={changesize} className={cx('show_image_content')} onClick={() => outside()}>
                    <div ref={mousesmile} className={cx('container_box_X')}>
                        <img onClick={(event) => handleChildClick(event)} src={imageSize} alt="" />
                        <p onClick={() => outImages()}>Đóng</p>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <UserfulFunction nameAlbum={nameAlbum} />
                <div className={cx('list_table')}>
                    <table>
                        <tr>
                            <th>{<FontAwesomeIcon icon={faHashtag} />}</th>
                            <th>Tiêu đề</th>
                            <th>{<FontAwesomeIcon icon={faClock} />}</th>
                        </tr>
                        <Playsongs component={component} />
                    </table>
                </div>
            </div>
            <footer>
                <p>
                    {releaseYearL.day &&
                        releaseYearL.day[2] + ' ' + 'tháng' + ' ' + releaseYearL.day[1] + ', ' + releaseYearL.day[0]}
                </p>
                <span className={cx('copyrights')}>{copyrights[0].name}</span>
                <span className={cx('copyrights')}>{copyrights[1].name}</span>
            </footer>
        </>
    );
}

export default ListOfPages;
