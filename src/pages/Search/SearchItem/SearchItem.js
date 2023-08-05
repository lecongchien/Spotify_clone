import { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Searchs } from '~/App';
import styles from './SearchItem.module.scss';
import { ThemeContext } from '~/components/themeContext/themeContext';
import { MContext, Search } from '~/App';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchItem() {
    const [searchValue, setSearchValue] = useState('');
    const [albums, setAlbums] = useState([]);
    const theme = useContext(ThemeContext);
    const inputref = useRef();
    const location = useLocation();
    const [searchData, setDataSearch] = useState([]);
    const runs = useCallback(async () => {
        if (!searchValue.trim()) {
            return;
        }

        const artistsID = await fetch(
            `https://api.spotify.com/v1/search?q=${decodeURIComponent(searchValue)}&type=artist`,
            theme.artistsParmester,
        )
            .then((response) => response.json())
            .then((data) => {
                setDataSearch(data.artists.items[0].id);
                return data.artists.items[0].id;
            });

        const Albums = await fetch(
            `https://api.spotify.com/v1/artists/${artistsID}/albums?market=ES&limit=20`,
            theme.artistsParmester,
        )
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.items);
            });
    }, [searchValue, theme.artistsParmester]);

    useEffect(() => {
        const searchTerm = decodeURIComponent(location.pathname.split('/').pop());
        setSearchValue(searchTerm);
    }, [location]);

    useEffect(() => {
        runs();
    }, [runs]);

    const handeClear = () => {
        setAlbums([]);
        setSearchValue('');
        inputref.current.focus();
        window.history.pushState(null, null, '/search/');
    };

    const change = (e) => {
        e.preventDefault();
        const changesearch = e.target.value;
        setSearchValue(changesearch);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        window.location.href = `/search/${encodeURIComponent(searchValue)}`;
    };

    window.history.pushState(null, null, `${searchValue}`);

    return (
        <div className={cx('search')}>
            <MContext.Consumer>
                {(context) => {
                    context.setMessage(albums);
                }}
            </MContext.Consumer>
            <Searchs.Consumer>
                {(context) => {
                    context.srch(searchData);
                }}
            </Searchs.Consumer>

            <form onSubmit={handleSearch} className={cx('searchTopic')}>
                <div className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                    ref={inputref}
                    value={searchValue}
                    spellCheck={true}
                    autoFocus
                    placeholder="Bạn muốn nghe gì? "
                    onChange={(e) => change(e)}
                ></input>
                {!!searchValue && (
                    <div className={cx('clear')} onClick={handeClear}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                )}
            </form>
        </div>
    );
}

export default SearchItem;
