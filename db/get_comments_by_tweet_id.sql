SELECT * FROM comments c
JOIN users u ON c.author_id = u.id
WHERE tweet_id = $1