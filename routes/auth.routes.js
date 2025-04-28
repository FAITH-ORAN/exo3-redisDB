const express = require('express')

function authRoutes(client) {
  const router = express.Router()

  // POST /auth
  router.post('/', async (req, res) => {
    await client.set('auth:token:12345', 'user42', { EX: 7200 })
    res.send('Token créé avec expiration de 2 heures.')
  })

  // GET /auth
  router.get('/', async (req, res) => {
    const ttl = await client.ttl('auth:token:12345')
    res.json({ ttl })
  })

  // POST /auth/logout - Supprimer le token d'authentification et la session utilisateur
  router.post('/logout', async (req, res) => {
    try {
      // Supprimer le token d'authentification
      await client.del('auth:token:12345')

      // Supprimer la session utilisateur
      await client.del('session:user42')

      res
        .status(200)
        .json({ message: 'Déconnexion réussie : token et session supprimés.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erreur lors de la déconnexion.' })
    }
  })

  return router
}

module.exports = authRoutes
