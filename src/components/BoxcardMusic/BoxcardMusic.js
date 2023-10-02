import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BoxcardMusic.module.scss';
import { useContext, useCallback } from 'react';
import ReusableBox from '../ReusableBox';
import { ThemeContext } from '../themeContext/themeContext';
import Button from '../button/Button';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { MContext } from '../Context/MContext';
import { AlbumsContext } from '../Context/AlbumsContext';
import { Artists } from '../Context/Artists';
const cx = classNames.bind(styles);

function BoxcardMusic({ NameAlbum = false }) {
    const [albums, setAlbums] = useState('');
    const [albumsID, setAlbumsID] = useState();
    const [ai, setai] = useState([]);
    const theme = useContext(ThemeContext);
    const dataArtist = useContext(Artists);
    const [Genres, setGenres] = useState([]);
    const locations = useLocation();
    const allLocation = locations.pathname;
    const setIdAlbum = allLocation.split('/');
    const IdAlBum = setIdAlbum[2];

    // console.log(dataArtist);
    useEffect(() => {
        let IdTrack = '';
        if (albums.length) {
            async function Tracks() {
                const Tracks = await fetch('https://api.spotify.com/v1/albums/' + albumsID, theme.artistsParmester)
                    .then((res) => res.json())
                    .then((res) => setai(res));
                return Tracks;
            }
            Tracks();
        }
    }, [albumsID]);

    const fetchProducts = useCallback(async () => {
        const reload = await axios
            .get('https://api.spotify.com/v1/recommendations?seed_genres=pop', theme.artistsParmester)
            .then((response) => {
                setGenres(response.data.tracks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [theme]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    return (
        <>
            <div className={cx('contain_items')}>
                <MContext.Consumer>
                    {(context) => {
                        setAlbums(context.state);
                    }}
                </MContext.Consumer>

                <AlbumsContext.Consumer>
                    {(context) => {
                        context.setAlbum(ai);
                    }}
                </AlbumsContext.Consumer>
                <div className={cx('search')}>
                    {albums == '' ? null : (
                        <div className={cx('title')}>{NameAlbum ? 'Album khác của' + ' ' + NameAlbum : 'Album'}</div>
                    )}

                    <div className={cx('boxmudic')}>
                        {albums === '' ? null : (
                            <>
                                {albums.slice(0, 10).map((element, index) => {
                                    return (
                                        <>
                                            <Button to={`/albums/${element.id}`} key={index}>
                                                <ReusableBox
                                                    onMouseOver={() => setAlbumsID(element.id)}
                                                    onClick={() => setAlbumsID(element.id)}
                                                    container
                                                    hover
                                                    cricle_Green_Play
                                                    image={element.images[0].url}
                                                    name={element.name}
                                                    date={
                                                        element.release_date.slice(0, 4) + ' ' + element.artists[0].name
                                                    }
                                                ></ReusableBox>
                                            </Button>
                                        </>
                                    );
                                })}
                            </>
                        )}
                    </div>
                    {/* ===========Artist========== */}
                    {albums == '' ? null : (
                        <div className={cx('title')}>{NameAlbum ? 'Album khác của' + ' ' + NameAlbum : 'Artist'}</div>
                    )}

                    <div className={cx('boxmudic')}>
                        {albums === '' ? null : (
                            <>
                                {dataArtist?.ArtistState?.artists?.items.slice(0, 10).map((element, index) => {
                                    return (
                                        <>
                                            <Button to={`/artist/${element?.id}`} key={index}>
                                                <ReusableBox
                                                    container
                                                    hover
                                                    cricle_Green_Play
                                                    image={element.images[0]?.url}
                                                    name={element.name}
                                                    artist={element.type}
                                                ></ReusableBox>
                                            </Button>
                                        </>
                                    );
                                })}
                            </>
                        )}
                    </div>
                                
                    {/* ===========Artist========== */}
                    {albums == '' && !(allLocation === `/albums/${IdAlBum}`) ? (
                        <div className={cx('content_genres')}>
                            {Genres.map((element, index) => {
                                const randomcolor = Math.floor(Math.random() * 999999);
                                const random = randomcolor > 100000 && randomcolor;
                                const color = {
                                    backgroundColor: `#${random}`,
                                };

                                return (
                                    <div style={color} className={cx('genres')}>
                                        <h2>{element.artists[0].name}</h2>
                                        <div className={cx('images')}>
                                            <img src={element.album.images[1].url} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
//https://github.com/tamhgdc/minizing-master
export default BoxcardMusic;
