import { createContext, useState } from 'react';

export const Setsize = createContext();

export const Size = ({ children }) => {
    const [SizeApp, setSizeApps] = useState('');

    return (
        <Setsize.Provider
            value={{
                setSizeApp: SizeApp,
                Size: (value) => setSizeApps(value),
            }}
        >
            {children}
        </Setsize.Provider>
    );
};
