SELECT tweets.id, author_id, title, body, image_url, COUNT(tweet_likes.id) AS likes
FROM tweets
JOIN tweet_likes on tweets.id = tweet_likes.tweet_id
WHERE body LIKE $1 OR title LIKE $1
GROUP BY tweets.id