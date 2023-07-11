import { useEffect, useState } from 'react';
import { AlbumsContext, MContext } from '~/App';
import classNames from 'classnames/bind';
import styles from './BoxcardMusic.module.scss';
import { useContext, useCallback } from 'react';
import ReusableBox from '../ReusableBox';
import { ThemeContext } from '../themeContext/themeContext';
import Button from '../button/Button';
import axios from 'axios';
import Run from '~/Routes/Routes';
import { useLocation, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function BoxcardMusic({ NameAlbum = false }) {
    const [albums, setAlbums] = useState('');
    const [albumsID, setAlbumsID] = useState();
    const [ai, setai] = useState([]);
    const theme = useContext(ThemeContext);
    const location = useParams();
    const [Genres, setGenres] = useState([]);
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
            .get('https://api.spotify.com/v1/recommendations/available-genre-seeds', theme.artistsParmester)
            .then((response) => {
                setGenres(response.data.genres);
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
            <div className={cx('search')}>
                {albums == '' ? null : (
                    <div className={cx('title')}>{NameAlbum ? 'Album khác của' + ' ' + NameAlbum : 'Album'}</div>
                )}
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
                                                image={element.images[0].url}
                                                name={element.name}
                                                date={element.release_date.slice(0, 4) + ' ' + element.artists[0].name}
                                            ></ReusableBox>
                                        </Button>
                                    </>
                                );
                            })}
                        </>
                    )}
                </div>
                {albums == '' ? (
                    <div className={cx('content_genres')}>
                        {Genres.map((element, index) => {
                            return (
                                <div className={cx('genres')}>
                                    <h2>{element}</h2>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </>
    );
}
//https://github.com/tamhgdc/minizing-master
export default BoxcardMusic;
