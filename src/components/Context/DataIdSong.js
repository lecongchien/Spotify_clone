import { createContext, useState } from 'react';

export const DataIdSong = createContext();

export const DataID = ({ children }) => {
    const [dataSong, setdataSong] = useState('');

    return (
        <DataIdSong.Provider value={{ setIdPlaySong: dataSong, ID: (value) => setdataSong(value) }}>
            {children}
        </DataIdSong.Provider>
    );
};
