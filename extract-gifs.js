export default (posts) => {
    return posts
        .map(post => post.data.url)
        .filter(url => /gifv?$|jpg$|png$/.exec(url))
        .map(url => url.replace(/v$/, ''))
}