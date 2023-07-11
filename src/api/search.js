export const search = {
    searchAlbum: async (searchValue, theme) => {
        const albums = await fetch('https://api.spotify.com/v1/search?q=' + searchValue + '&type=album', theme)
            .then((response) => response.json())
            .then((data) => {
                return data.albums;
            });
        console.log(albums);

        const Albums = await fetch(
            'https://api.spotify.com/v1/artists/' + albums + '/albums' + '?market=ES&limit=20',
            theme.artistsParmester,
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.items);
            });
    },
};
