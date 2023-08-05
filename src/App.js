import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Run, { publicRoutes } from './Routes/Routes';
import DefaultLayout from '~/layout/DefaultLayout';
import { createContext, Fragment, useState } from 'react';

export const MContext = createContext(); //exporting context object
export const AlbumsContext = createContext();
export const Setsize = createContext();
export const Searchs = createContext();
export const DataIdSong = createContext();

function App() {
    const [state, setState] = useState('');
    const [albumState, setAlbumsStates] = useState('');
    const [SizeApp, setSizeApps] = useState('');
    const [searchItems, setSearchItems] = useState('');
    const [dataSong, setdataSong] = useState('');

    return (
        <MContext.Provider
            value={{
                state: state,
                setMessage: (value) => setState(value),
            }}
        >
            <div>
                <AlbumsContext.Provider
                    value={{
                        albumState: albumState,
                        setAlbum: (values) => setAlbumsStates(values),
                    }}
                >
                    <Setsize.Provider
                        value={{
                            setSizeApp: SizeApp,
                            Size: (value) => setSizeApps(value),
                        }}
                    >
                        <Searchs.Provider
                            value={{
                                setSearch: searchItems,
                                srch: (value) => setSearchItems(value),
                            }}
                        >
                            <DataIdSong.Provider value={{ setIdPlaySong: dataSong, ID: (value) => setdataSong(value) }}>
                                <Router>
                                    <div className="App">
                                        <Routes>
                                            {publicRoutes.map((router, index) => {
                                                const Page = router.component;
                                                let Layout = DefaultLayout;
                                                if (router.layout) {
                                                    Layout = router.layout;
                                                } else if (router.layout === null) {
                                                    Layout = Fragment;
                                                }
                                                return (
                                                    <Route
                                                        key={index}
                                                        path={
                                                            router.path === '/albums/:AlbumsId'
                                                                ? '/albums/:AlbumsId'
                                                                : router.path
                                                        }
                                                        element={
                                                            <Layout>
                                                                <Page />
                                                            </Layout>
                                                        }
                                                    />
                                                );
                                            })}
                                        </Routes>
                                    </div>
                                </Router>
                            </DataIdSong.Provider>
                        </Searchs.Provider>
                    </Setsize.Provider>
                </AlbumsContext.Provider>
            </div>
        </MContext.Provider>
    );
}

export default App;
