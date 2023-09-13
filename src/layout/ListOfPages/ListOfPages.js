import { faCircle, faClock, faClose, faEllipsis, faHashtag, faMusic, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import styles from './ListOfPages.module.scss';
import ColorThief from 'colorthief';
import UserfulFunction from '~/components/UserfulFunction/UserfulFunction';
import { ThemeContext } from '~/components/themeContext/themeContext';
import axios from 'axios';
import Playsongs from './Playsongs/Playsongs';
import NameUser from '~/components/NameUser/NameUser';
const cx = classNames.bind(styles);

function ListOfPages() {
    const { ID } = useParams(null);
    const [component, setComponet] = useState([null]);
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
        image.src = `${imageBig || changeFile}`;
        image.onload = () => {
            const colorThief = new ColorThief();
            setColor(colorThief.getColor(image));
        };
    }, [imageBig, changeFile]);

    //change size images

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
                        color && {
                            backgroundImage: `linear-gradient(#3f3f3f 0, rgb(${color[0]}, ${color[1]}, ${color[2]}) 100%)`,
                            boxShadow: `
                        0px 55px 124px 28px rgb(${color[0]} ${color[1]} ${color[2]} / 34%)`,
                        }
                    }
                    className={cx('box_content_music')}
                >
                    <div className={cx('header')}>
                        <div
                            className={cx('image-artist')}
                            onClick={() => handelImags()}
                            onMouseOver={() => mouseover()}
                            onMouseLeave={() => mouseLeave()}
                        >
                            {allUrl !== `/MyPlaylist/${IDUrl}` ? (
                                <img src={imageBig} alt="" />
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
                            <h4>{allUrl !== `/MyPlaylist/${IDUrl}` ? type : 'Playlist'}</h4>
                            <h2>{allUrl !== `/MyPlaylist/${IDUrl}` ? type : `Danh sách phát của tôi #${setUrl[2]}`}</h2>
                            <div>
                                {allUrl !== `/MyPlaylist/${IDUrl}` ? <img src={imagesmall} alt="2" /> : null}
                                <a src="/">{allUrl !== `/MyPlaylist/${IDUrl}` ? nameArtist : <NameUser />}</a>
                                {allUrl !== `/MyPlaylist/${IDUrl}` ? (
                                    <>
                                        {Icon}
                                        <p>{day}</p>
                                        {Icon}
                                        <p className={cx('number-song')}>{numberOfTrack + ' ' + 'bài hát' + ''} </p>
                                        <p className={cx('time')}>{overRall}</p>
                                    </>
                                ) : null}
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
