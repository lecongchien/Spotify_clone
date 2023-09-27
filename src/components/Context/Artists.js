import { createContext, useState } from 'react';

export const Artists = createContext();

export const ArtistID = ({ children }) => {
    const [ArtistState, setArtist] = useState('');
    return (
        <Artists.Provider
            value={{
                ArtistState: ArtistState,
                setArts: (values) => setArtist(values),
            }}
        >
            {children}
        </Artists.Provider>
    );
};
