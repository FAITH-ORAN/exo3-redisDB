const express = require('express')

function sessionRoutes(client) {
  const router = express.Router()

  // POST /session
  router.post('/', async (req, res) => {
    const userSession = {
      username: 'alice',
      email: 'alice@example.com',
      role: 'user',
    }
    await client.set('session:user42', JSON.stringify(userSession), {
      EX: 1800,
    })
    res.send('Session utilisateur stockée avec expiration de 30 minutes.')
  })

  // GET /session
  router.get('/', async (req, res) => {
    const ttl = await client.ttl('session:user42')
    res.json({ ttl })
  })

  return router
}

module.exports = sessionRoutes
