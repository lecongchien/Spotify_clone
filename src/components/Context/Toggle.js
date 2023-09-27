import { createContext, useState } from 'react';

export const Toggle = createContext();

export const ToggleAll = ({ children }) => {
    const [handleToggle, setHandleToggle] = useState();

    return (
        <Toggle.Provider
            value={{
                setNb: handleToggle,
                toggle: (value) => setHandleToggle(value),
            }}
        >
            {children}
        </Toggle.Provider>
    );
};
