import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Run, { publicRoutes } from './Routes/Routes';
import DefaultLayout from '~/layout/DefaultLayout';
import { createContext, Fragment, useState } from 'react';

export const MContext = createContext(); //exporting context object
export const AlbumsContext = createContext();
function App() {
    const [state, setState] = useState('');
    const [albumState, setAlbumsStates] = useState('');
    const [dsa, setdsad] = useState('');

    // localStorage.setItem('myData', JSON.stringify(albumState));
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
                                                router.path === '/albums/:AlbumsId' ? '/albums/:AlbumsId' : router.path
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
                </AlbumsContext.Provider>
            </div>
        </MContext.Provider>
    );
}

export default App;
