module.exports = {
  getAllUsers: async (req, res) => {
    const db = req.app.get('db')

    const users = await db.get_all_users()

    res.status(200).send(users)
  },

  getUserById: async (req, res) => {
    const db = req.app.get('db')

    const { user_id } = req.params

    const [user] = await db.get_user_by_id([user_id])

    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send('User not found')
    }
  },

  getUserTweets: async (req, res) => {
    const db = req.app.get('db')

    const { user_id } = req.params

    const tweets = await db.get_tweets_by_author_id([user_id])

    if (tweets.length) {
      res.status(200).send(tweets)
    } else {
      res.status(404).send('No tweets found for given user')
    }
  },
}
