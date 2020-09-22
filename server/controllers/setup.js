module.exports = {
  seedDb: async (req, res) => {
    const db = req.app.get('db')
    try {
      await db.seed()

      res.status(200).send('DB Seeded')
    } catch (error) {
      res.status(500).send({ message: 'Failed to seed db', error: error })
    }
  },
}
