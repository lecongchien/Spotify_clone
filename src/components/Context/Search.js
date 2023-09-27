import { createContext, useState } from 'react';

export const Searchs = createContext();

export const Search = ({ children }) => {
    const [searchItems, setSearchItems] = useState('');

    return (
        <Searchs.Provider
            value={{
                setSearch: searchItems,
                srch: (value) => setSearchItems(value),
            }}
        >
            {children}
        </Searchs.Provider>
    );
};
