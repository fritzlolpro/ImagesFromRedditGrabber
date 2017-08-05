import RedditApi from 'reddit-api.js'
import ExtractGifs from 'extract-gifs.js'
import DisplayGifs from 'display-gifs.js'
RedditApi.load()
    .then(ExtractGifs)
    .then(DisplayGifs)

export default {}