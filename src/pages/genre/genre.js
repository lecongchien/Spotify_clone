// import { useContext, useEffect, useState } from 'react';
// import { ThemeContext } from '~/components/themeContext/themeContext';
// const Gen = async () => {
//     const theme = useContext(ThemeContext);
//     const setDAta = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
//     useEffect(() => {
//         fetch(setDAta, theme.artistsParmester)
//             .then((ew) => ew.json())
//             .then((data) => {
//                 return data.genres;
//             })
//             .catch((error) => console.error(error));
//     }, []);
// };
// export { Gen };

// function Genre() {
//     const [genreAll] = useState(Gen);
//     console.log(genreAll);
//     return <div></div>;
// }

// export default Genre;
