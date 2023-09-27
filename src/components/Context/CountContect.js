import { createContext, useState } from 'react';

export const Count = createContext();

export const CountChange = ({ children }) => {
    const [count, setCount] = useState('');
    return (
        <Count.Provider
            value={{
                setCounthandle: count,
                setCounts: (values) => setCount(values),
            }}
        >
            {children}
        </Count.Provider>
    );
};
