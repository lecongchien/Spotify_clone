import { createContext, useState } from 'react';

export const PlaylistContext = createContext();

export const Playlists = ({ children }) => {
    const [playlistcusomer, setPlaylistcusomer] = useState();
    
    return (
        <PlaylistContext.Provider
            value={{
                playlistcontext: playlistcusomer,
                Play: (value) => setPlaylistcusomer(value),
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
    
};
