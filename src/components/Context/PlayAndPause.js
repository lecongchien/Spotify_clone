import { createContext, useState } from 'react';

export const PlayAndPause = createContext();

export const PlayAndPauseButton = ({ children }) => {
    const [togglePlay, setTogglePlay] = useState();

    return (
        <PlayAndPause.Provider
            value={{
                setPlayAndpause: togglePlay,
                Toggle: (value) => setTogglePlay(value),
            }}
        >
            {children}
        </PlayAndPause.Provider>
    );
};
