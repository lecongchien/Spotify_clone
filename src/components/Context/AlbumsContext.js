import { createContext, useState } from 'react';

export const AlbumsContext = createContext();

export const AlbumID = ({ children }) => {
    const [albumState, setAlbumsStates] = useState('');

    return (
        <AlbumsContext.Provider
            value={{
                albumState: albumState,
                setAlbum: (values) => setAlbumsStates(values),
            }}
        >
            {children}
        </AlbumsContext.Provider>
    );
};
