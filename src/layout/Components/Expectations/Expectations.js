import classNames from 'classnames/bind';
import styles from './Expectations.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { HeartIcon, MusicNote } from '~/assets/Icon/Icon';
import { useContext, useEffect, useState } from 'react';
import Noimages from '~/assets/image/noImage.jpg';
import { ThemeContext } from '~/components/themeContext/themeContext';
import { DataIdSong } from '~/components/Context/DataIdSong';
import { Toggle } from '~/components/Context/Toggle';
const cx = classNames.bind(styles);
function Expectations({ name }) {
    const [handelToggle, setHandelToggle] = useState(false);
    const toggles = () => {
        setHandelToggle(!handelToggle);
    };

    const theme = useContext(ThemeContext);
    const [artistData, setArtistData] = useState(null);
    const data = useContext(DataIdSong);
    // const datas = useSelector((state) => state.data);
    useEffect(() => {
        setTimeout(() => {
            if (data) {
                return data;
            }
        }, 3000);
    }, [data]);
    return (
        <div ref={name} className={cx('container')}>
            <Toggle.Consumer>
                {(context) => {
                    context.toggle(handelToggle);
                }}
            </Toggle.Consumer>
            <div className={cx('expectations')}>
                <div className={cx('header_info')}>
                    <a href="/">{data?.setIdPlaySong[0]?.name}</a>
                </div>
                <div className={cx('images_artist')}>
                    <img
                        src={
                            data?.setIdPlaySong[1]?.images[0]?.url ||
                            data?.setIdPlaySong[0]?.album?.images[0]?.url ||
                            Noimages
                        }
                        alt="imgae"
                    />
                </div>
            </div>
            <div className={cx('shining_start')}>
                <div className={cx('header_artist')}>
                    <div className={cx('title')}>
                        <a href="/">
                            <h2>{data?.setIdPlaySong[0]?.name}</h2>
                        </a>
                        <a href="/">
                            <p>{data?.setIdPlaySong[0]?.artists[0]?.name}</p>
                        </a>
                    </div>
                    <div className={cx('function_play')}>
                        <Tippy className={cx('tippy_title')} arrow={false} placement={'top'} content="Lưu vào thư viện">
                            <div className={cx('heart')}>
                                <HeartIcon />
                            </div>
                        </Tippy>
                        <Tippy
                            className={cx('tippy_title')}
                            arrow={false}
                            placement={'top'}
                            content="Các tùy chọn khác cho"
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </Tippy>
                    </div>
                </div>
            </div>
            <div className={cx('save_forum')}>
                <div className={cx('save_header')}>
                    <h3>Tiếp theo trong danh sách phát chờ</h3>
                    <a href="/">Mở danh sách phát chờ </a>
                </div>
                <div className={cx('music_note')}>
                    <MusicNote />
                    <img src="https://i.pinimg.com/564x/b8/e0/92/b8e092667798e1a8fdcdcdbb30dd4ce0.jpg" />
                    <div className={cx('info')}>
                        <a href="/" className={cx('name_music')}>
                            Ali Lacey began Novo Amor as a project of sorts - an act
                        </a>
                        <a href="/" className={cx('name_artist')}>
                            Amor as a project
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expectations;
