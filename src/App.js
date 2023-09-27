import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Run, { publicRoutes } from './Routes/Routes';
import DefaultLayout from '~/layout/DefaultLayout';
import { createContext, Fragment, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Login } from './components/Context/LoginAndRegister';
import { Mes } from './components/Context/MContext';
import { AlbumID } from './components/Context/AlbumsContext';
import { Size } from './components/Context/Setsize';
import { Search } from './components/Context/Search';
import { DataID } from './components/Context/DataIdSong';
import { PlayAndPauseButton } from './components/Context/PlayAndPause';
import { ToggleAll } from './components/Context/Toggle';
import { ArtistID } from './components/Context/Artists';
import { Playlists } from './components/Context/PlaylistContext';
import { CountChange } from './components/Context/CountContect';
export const AlbumsContext = createContext();
export const Setsize = createContext();
export const PlayAndPause = createContext();
export const Toggle = createContext();

function App() {
    return (
        <Provider store={store}>
            <Login>
                <Mes>
                    <AlbumID>
                        <ArtistID>
                            <Playlists>
                                <Size>
                                    <CountChange>
                                        <Search>
                                            <DataID>
                                                <PlayAndPauseButton>
                                                    <ToggleAll>
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
                                                                                path={router.path}
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
                                                    </ToggleAll>
                                                </PlayAndPauseButton>
                                            </DataID>
                                        </Search>
                                    </CountChange>
                                </Size>
                            </Playlists>
                        </ArtistID>
                    </AlbumID>
                </Mes>
            </Login>
        </Provider>
    );
}

export default App;
