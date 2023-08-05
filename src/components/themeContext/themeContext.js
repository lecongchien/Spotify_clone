import { useState, useEffect, createContext } from 'react';
const ThemeContext = createContext();
const CLIENT_ID = '4f482d3452d04e2090916aed8c10631e';
const CLIENT_SECRET = '2135116a364c49d8b65c3115ddef3f4c';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

function ThemeProvider({ children }) {
    const [accectsToken, setAccectsToken] = useState('');

    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
        };

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then((result) => result.json())
            .then((data) => setAccectsToken(data.access_token));
    }, []);

    var artistsParmester = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accectsToken,
        },
    };

    const theme = {
        artistsParmester,
    };
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
