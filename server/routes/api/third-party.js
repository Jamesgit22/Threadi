const router = require("express").Router();

router.get("/popularMovies", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`,
            {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization:
                        process.env.TMDB_BEARER_TOKEN,
                },
            }
        );
        const data = await response.json();
        res.status(200).json(data.results.slice(0, 3)); // Retrieve only the first 3 movies
    } catch (error) {
        res.status(400).json({ message: 'Unable to call movie API: ' + err });
    }
});

router.post("/browseSearch", async (req, res) => {
    try {
        switch (selectedWord) {
            case 'Video Games': {
                axios
                    .get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=1&search=${req.searchInput}&exclude_additions=true&page_size=10`)
                    .then((response) => {

                        if (!response.ok) {
                            throw new Error('RAWG API ERROR: Something went wrong.');
                        };

                        const rawgData = response.results.map((game) => ({
                            type: selectedWord,
                            image: game.background_image,
                            title: game.name,
                            releaseDate: game.released,
                            id: game.id
                        }));

                        res.status(200).json(rawgData);
                    })
                    .catch((err) => {
                        res.status(400).json({ message: 'Unable to call rawg API: ' + err });
                    });

                break;
            }
            case 'Movie' || 'Show': {
                var searchType;

                if (selectedWord === 'Movie') {
                    searchType = 'movie';
                } else {
                    searchType = 'tv';
                };

                axios
                    .get(`https://api.themoviedb.org/3/search/${req.searchType}?query=${req.searchInput}&include_adult=false&language=en-US&page=1`)
                    .then((response) => {

                        if (!response.ok) {
                            throw new Error('TMDb ERROR: Something went wrong.');
                        };

                        const tmdbData = response.results.map((media) => ({
                            type: selectedWord,
                            backdrop: `https://image.tmdb.org/t/p/w500/${media.backdrop_path}` || 'No backdrop.',
                            image: `https://image.tmdb.org/t/p/w500/${media.poster_path}` || 'No image.',
                            title: media.name,
                            description: media.overview || 'No description.',
                            releaseDate: media.first_air_date || 'Release date unavailable.'
                        }));

                        res.status(200).json(tmdbData);
                    })
                    .catch((err) => {
                        res.status(400).json({ message: 'Unable to call movie API: ' + err });
                    });

                break;
            }
            case 'Anime' || 'Manga': {
                axios
                    .get(`https://api.myanimelist.net/v2/${req.selectedWord.toLowerCase()}?q=${req.searchInput}`, {
                        headers: {
                            'X-MAL-CLIENT-ID': `${process.env.MAL_CLIENT_ID}`
                        }
                    })
                    .then((response) => {

                        if (!response.ok) {
                            throw new Error('MAL_API ERROR: Something went wrong.');
                        };

                        const weebData = response.data.map((media) => ({
                            type: selectedWord,
                            title: media.node.title,
                            image: media.node?.main_picture.large || 'No image.'
                        }));

                        res.status(200).json(weebData);
                    })
                    .catch((err) => {
                        res.status(400).json({ message: 'Unable to call MAL API: ' + err });
                    });

                break;
            }
            case 'Book': {
                axios
                    .get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
                    .then((res) => {

                        if (!res.ok) {
                            throw new Error('BookAPI ERROR: Something went wrong.');
                        };

                        const bookData = res.items.map((book) => ({
                            type: selectedWord,
                            authors: book.volumeInfo.authors || ['No author to display'],
                            title: book.volumeInfo.title,
                            description: book.volumeInfo.description,
                            image: book.volumeInfo.imageLinks?.thumbnail || ''
                        }));

                        res.status(200).json(bookData);
                    })
                    .catch((err) => {
                        res.status(400).json({ message: 'Unable to call books API: ' + err });
                    });

                break;
            }
        }
    } catch (err) {
        res.status(400).json({ message: 'Unable to call third party API: ' + err });
    }
});

module.exports = router;