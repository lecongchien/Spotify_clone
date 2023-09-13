import { useContext, useCallback, useEffect, useState } from 'react';
import { Searchs } from '~/App';
import { ThemeContext } from '../themeContext/themeContext';
import axios from 'axios';
import styles from './TopResults.module.scss';
import classNames from 'classnames/bind';
import ReusableBox from '../ReusableBox/ReusableBox';
const cx = classNames.bind(styles);

function TopResults() {
    const search = useContext(Searchs);
    const theme = useContext(ThemeContext);
    const [artist, setArtist] = useState('');
    const fetchProducts = useCallback(async () => {
        const reload = await axios
            .get(`https://api.spotify.com/v1/artists/${search.setSearch}`, theme.artistsParmester)
            .then((response) => {
                setArtist(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [theme, search]);
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <div className={cx('content')}>
                <ReusableBox TopResults hover>
                    <div className={cx('results_contains_left')}>
                        <div className={cx('artist_infomation')}>
                            {artist?.images?.[0] && <img src={artist.images[0].url} />}
                            <h1>{artist?.name && artist.name}</h1>
                            <p>{artist?.type && artist.type === 'artist' ? 'Nghệ sĩ' : 'Bài hát'}</p>
                        </div>
                    </div>
                </ReusableBox>
                <ReusableBox TopResults>
                    <div className={cx('results_contains_right')}></div>
                </ReusableBox>
            </div>
        </>
    );
}

export default TopResults;
