module.exports = {
  getAllTweets: async (req, res) => {
    const db = req.app.get('db')
    //-TODO ALLOW FOR A SEARCH QUERY
    console.log(req.query)
    const { search = '' } = req.query

    const searchTerm = `%${search}%`

    const tweets = await db.get_all_tweets([searchTerm])

    res.status(200).send(tweets)
  },
  getTweetComments: async (req, res) => {
    const db = req.app.get('db')

    const { tweet_id } = req.params

    const comments = await db.get_comments_by_tweet_id([tweet_id])

    if (comments.length) {
      res.status(200).send(comments)
    } else {
      res.status(404).send('No comments for given tweet')
    }
  },
}
