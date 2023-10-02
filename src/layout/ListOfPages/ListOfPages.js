import { faCircle, faClock, faClose, faEllipsis, faHashtag, faMusic, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import styles from './ListOfPages.module.scss';
import ColorThief from 'colorthief';
import { ThemeContext } from '~/components/themeContext/themeContext';
import axios from 'axios';
import Playsongs from './Playsongs/Playsongs';
import NameUser from '~/components/NameUser/NameUser';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';

import { HeartIcon, SpotifyIcons } from '~/assets/Icon/Icon';
import Button from '~/components/button';
import playlists from '~/pages/playlists';

const cx = classNames.bind(styles);

function ListOfPages() {
    const { ID } = useParams(null);
    const [component, setComponet] = useState([null]);
    const [componentPlaylist, setComponentPlaylist] = useState([null]);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [changeFile, setChangeFile] = useState(null);
    const [handelClose, sethandleClose] = useState(false);
    const [handelSetting, setHandleSetting] = useState(false);
    const [delayImage, setDelayImage] = useState();
    const theme = useContext(ThemeContext);
    const loactionsMyPlaylist = useLocation();
    const allUrl = loactionsMyPlaylist.pathname;
    const fileInputRef = useRef(null);
    const setUrl = allUrl.split('/');
    const IDUrl = setUrl[2];
    const types = setUrl[1];

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

    const fetchArtist = useCallback(async () => {
        const reload = await axios
            .get(`https://api.spotify.com/v1/artists/${ID}`, theme.artistsParmester)
            .then((response) => {
                setComponet(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [ID, theme]);

    const Playlist = useCallback(async () => {
        const playlist = await axios
            .get(`https://api.spotify.com/v1/playlists/${ID}`, theme.artistsParmester)
            .then((responde) => {
                setComponentPlaylist(responde.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [ID, theme]);

    useEffect(() => {
        fetchProducts();
        fetchArtist();
        Playlist();
    }, [fetchProducts, fetchArtist, Playlist]);

    const [color, setColor] = useState(null);

    // =====================Artist and album =======================
    const infoToAlist = {
        imageSize: component.images && component.images[0].url,
        imageBig: component.images && component.images[1].url,
        imagesmall: component.images && component.images[2].url,
        total: component.followers && component.followers.total.toLocaleString(),
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
        total,
        hoursAndMinutes,
    } = infoToAlist;

    const overRall = ' ' + ', ' + hoursAndMinutes[0] + ' ' + 'giờ' + ' ' + hoursAndMinutes[1] + ' ' + 'phút';
    // =====================Artist and album =======================

    //======================playlist=============================//
    const playlist = {
        typePlaylist: componentPlaylist?.type,
        nameTitle: componentPlaylist?.name,
        imageplaylist: componentPlaylist?.images && componentPlaylist?.images[0]?.url,
        title: componentPlaylist?.description,
        followers: componentPlaylist?.followers?.total.toLocaleString('vi-VN'),
        lengthSong: componentPlaylist?.tracks?.total,
    };

    const { typePlaylist, nameTitle, imageplaylist, title, followers, lengthSong } = playlist;

    useEffect(() => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = `${imageplaylist || imageBig || changeFile}`;
        image.onload = () => {
            const colorThief = new ColorThief();
            setColor(colorThief.getColor(image));
        };
    }, [imageBig, changeFile, imageplaylist]);

    const nameAlb = 'Các tùy chọn khác cho' + ' ' + nameAlbum;
    const [HandleToggleAll, setHandleToggleAll] = useState(false);

    const changeFunction = () => {
        setHandleToggleAll(!HandleToggleAll);
    };
    //change size images
    console.log(componentPlaylist);
    const changesize = useRef();
    const mousesmile = useRef();

    const handelImags = () => {
        if (allUrl !== `/MyPlaylist/${IDUrl}`) {
            changesize.current.style.visibility = 'visible';
            mousesmile.current.style.transform = 'scale(1) translateY(0)';
            mousesmile.current.style.transition = '500ms ease';
            mousesmile.current.style.opacity = '1';
            changesize.current.style.opacity = '1';
        } else {
            sethandleClose(true);
            fileInputRef.current.click();
        }
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

    const mouseover = () => {
        setIsMouseOver(true);
    };

    const mouseLeave = () => {
        setIsMouseOver(false);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile instanceof File || selectedFile instanceof Blob)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setChangeFile(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    useEffect(() => {
        setDelayImage(changeFile);
    }, [changeFile]);
    const changeOnClick = () => {
        sethandleClose(false);
    };

    const setting = () => {
        setHandleSetting(!handelSetting);
    };

    return (
        <>
            <div className={cx('content_context')}>
                <div
                    style={
                        types === 'artist'
                            ? {
                                  backgroundImage: `url(${imageSize || imageplaylist})`,
                                  backgroundRepeat: 'no-repeat',
                                  //   backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  width: '100%',
                              }
                            : color && {
                                  backgroundImage: `linear-gradient(#3f3f3f 0, rgb(${color[0]}, ${color[1]}, ${color[2]}) 100%)`,
                                  boxShadow: `
                        0px 55px 124px 28px rgb(${color[0]} ${color[1]} ${color[2]} / 34%)`,
                              }
                    }
                    className={cx('box_content_music')}
                >
                    <div className={cx('header')}>
                        {types === 'artist' ? null : (
                            <div
                                className={cx('image-artist')}
                                onClick={() => handelImags()}
                                onMouseOver={() => mouseover()}
                                onMouseLeave={() => mouseLeave()}
                            >
                                {allUrl !== `/MyPlaylist/${IDUrl}` ? (
                                    <img src={imageBig || imageplaylist} alt="" />
                                ) : isMouseOver ? (
                                    <>
                                        <FontAwesomeIcon icon={faPen} />
                                        <p>Chọn ảnh</p>
                                    </>
                                ) : delayImage ? (
                                    delayImage && <img src={delayImage} alt="Selected" />
                                ) : (
                                    <FontAwesomeIcon icon={faMusic} />
                                )}
                            </div>
                        )}
                        <form method="post">
                            <input
                                type="file"
                                id="myFileInput"
                                name="file"
                                multiple
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={(event) => handleFileChange(event)}
                            />
                        </form>
                        <div className={cx('album-info-by-artist')}>
                            {/* Tên thể loại nhạc*/}
                            {typePlaylist === 'playlist' && <h4>{typePlaylist}</h4>}
                            {types === 'artist' ? null : (
                                <h4>{allUrl !== `/MyPlaylist/${IDUrl}` ? type : 'Playlist'}</h4>
                            )}
                            {/**Tên tiêu đề bài hát */}
                            <h2
                                className={cx(types === 'artist' || typePlaylist ? 'name_title_artist' : 'name_artist')}
                            >
                                {allUrl !== `/MyPlaylist/${IDUrl}`
                                    ? nameAlbum || nameTitle
                                    : `Danh sách phát của tôi #${setUrl[2]}`}
                            </h2>
                            {title && <h4>{title}</h4>}
                            {types === 'artist' ? null : (
                                <div>
                                    {allUrl !== `/MyPlaylist/${IDUrl}` ? (
                                        componentPlaylist ? (
                                            <div className={cx('spotify')}>
                                                <SpotifyIcons />
                                                <p>Spotify</p>
                                            </div>
                                        ) : (
                                            <img src={imagesmall} alt="2" />
                                        )
                                    ) : null}
                                    <a src="/">{allUrl !== `/MyPlaylist/${IDUrl}` ? nameArtist : <NameUser />}</a>
                                    {allUrl !== `/MyPlaylist/${IDUrl}` ? (
                                        <>
                                            {Icon}
                                            <p>{day || followers + ' ' + 'lượt thích'}</p>
                                            {Icon}
                                            <p className={cx('number-song')}>
                                                {numberOfTrack || lengthSong + ' ' + 'bài hát' + ''}{' '}
                                            </p>
                                            <p className={cx('time')}>
                                                {allUrl !== `/playlists/${IDUrl}` ? overRall : null}
                                            </p>
                                        </>
                                    ) : null}
                                </div>
                            )}
                            {types === 'artist' && (
                                <>
                                    <p>{total + ' ' + 'người nghe hằng tháng'}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div ref={changesize} className={cx('show_image_content')} onClick={() => outside()}>
                        <div ref={mousesmile} className={cx('container_box_X')}>
                            <img onClick={(event) => handleChildClick(event)} src={imageSize || imageplaylist} alt="" />
                            <p onClick={() => outImages()}>Đóng</p>
                        </div>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('list_table')}>
                        <table>
                            <tr style={types && { gridTemplateColumns: '0.3fr 1.5fr 1fr 0.5fr 1fr' }}>
                                <th>{<FontAwesomeIcon icon={faHashtag} />}</th>
                                <th>Tiêu đề</th>
                                {types === 'playlists' && (
                                    <>
                                        <th>Album</th>
                                        <th>Ngày thêm</th>
                                    </>
                                )}
                                <th>{<FontAwesomeIcon icon={faClock} />}</th>
                            </tr>
                            <Playsongs component={component} componentPlaylist={componentPlaylist} />
                        </table>
                    </div>
                </div>
                <footer>
                    <p>
                        {releaseYearL.day &&
                            releaseYearL.day[2] +
                                ' ' +
                                'tháng' +
                                ' ' +
                                releaseYearL.day[1] +
                                ', ' +
                                releaseYearL.day[0]}
                    </p>
                    <span className={cx('copyrights')}>{copyrights[0].name}</span>
                    <span className={cx('copyrights')}>{copyrights[1].name}</span>
                </footer>
                {handelClose && (
                    <div className={cx('Edit_detailed_information')}>
                        <div className={cx('edit_content')}>
                            <div className={cx('header_edit')}>
                                <h2>Sửa thông tin chi tiết</h2>
                                <FontAwesomeIcon onClick={() => changeOnClick()} icon={faClose} />
                            </div>
                            <div className={cx('content_edit')}>
                                <div className={cx('box-left')}>
                                    {isMouseOver ? (
                                        <>
                                            <FontAwesomeIcon icon={faPen} />
                                            <p>Chọn ảnh</p>
                                        </>
                                    ) : changeFile ? (
                                        changeFile && <img src={changeFile} alt="Selected" />
                                    ) : (
                                        <FontAwesomeIcon icon={faMusic} />
                                    )}

                                    <FontAwesomeIcon
                                        onClick={() => setting()}
                                        className={cx('ellipsis')}
                                        icon={faEllipsis}
                                    />
                                    {handelSetting && (
                                        <div className={cx('handle')}>
                                            <ul>
                                                <li
                                                    onClick={() => {
                                                        fileInputRef.current.click();
                                                        setHandleSetting(false);
                                                    }}
                                                >
                                                    Thay đổi ảnh
                                                </li>
                                                <li>Xóa ảnh</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className={cx('box-right')}>
                                    <input type="text" className={cx('edit_playlist')} />
                                    <input
                                        type="text"
                                        placeholder="Thêm phần mô tả không bắt buộc"
                                        className={cx('edit_describe')}
                                    />
                                </div>
                            </div>
                            <div className={cx('footer_edit')}>
                                <button>Lưu</button>
                            </div>
                            <p>
                                Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình ảnh bạn đã chọn để tải
                                lên. Vui lòng đảm bảo bạn có quyền tải lên hình ảnh.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ListOfPages;
