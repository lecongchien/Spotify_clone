import classNames from 'classnames/bind';
import styles from './Lyric.module.scss';
import { useCallback, useContext, useEffect } from 'react';
import { ThemeContext } from '~/components/themeContext/themeContext';
import axios from 'axios';

const cx = classNames.bind(styles);
function Lyric() {
    const theme = useContext(ThemeContext);

    const fetchProducts = useCallback(async () => {
        const reload = await axios
            .get('https://api.spotify.com/v1/tracks/4eLPsYPBmXABThSJ821sqY', theme.artistsParmester)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [theme]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return 123;
}

export default Lyric;
