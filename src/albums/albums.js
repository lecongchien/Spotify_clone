import { useState } from 'react';

function Albums() {
    const [albums, setALbums] = useState();
    console.log(albums);
    return (
        <div>
            {/* <ChidrenContect.Consumer>
                {(context) => {
                    setALbums(context.stateAlbum);
                }}
            </ChidrenContect.Consumer> */}
            222
        </div>
    );
}

export default Albums;
