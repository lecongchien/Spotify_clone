import config from '~/config';
import Search from '~/pages/Search';
import Collection from '~/pages/Collection';
import Playlists from '~/pages/playlists';
import Podcast from '~/pages/podcast/podcast';
import Artists from '~/pages/artists';
import Album from '~/pages/album/album';
import ListBox from '~/layout/Components/ListBox';
import ListOfPages from '~/layout/ListOfPages';
import { AlbumsContext } from '~/App';
import { useState } from 'react';
const publicRoutes = [
    { path: config.routes.home, component: ListBox },
    { path: config.routes.search, component: Search },
    { path: config.routes.Search, component: Search },
    { path: config.routes.collection, component: Collection },
    { path: config.routes.podcast, component: Podcast },
    { path: config.routes.artists, component: Artists },
    { path: config.routes.album, component: Album },
    { path: config.routes.playlist, component: Playlists },
    { path: '/albums/:AlbumsId', component: ListOfPages },
];

function Run() {
    const [dsa, setdsad] = useState();
    return (
        <AlbumsContext.Consumer>
            {(context) => {
                setdsad(context.albumState.id);
                console.log(dsa);
            }}
        </AlbumsContext.Consumer>
    );
}
export default Run;
export { publicRoutes };
