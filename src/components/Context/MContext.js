import { createContext, useState } from 'react';

export const MContext = createContext();

export const Mes = ({ children }) => {
    const [state, setState] = useState('');
    return (
        <MContext.Provider
            value={{
                state: state,
                setMessage: (value) => setState(value),
            }}
        >
            {children}
        </MContext.Provider>
    );
};
