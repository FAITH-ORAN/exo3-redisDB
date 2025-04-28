const express = require('express')

function userRoutes(client) {
  const router = express.Router()

  // POST /user/profile - Stocker le profil utilisateur dans un HASH
  router.post('/profile', async (req, res) => {
    try {
      await client.hSet('user:42', {
        name: 'Alice',
        email: 'alice@example.com',
        city: 'Paris',
      })
      res.status(201).json({ message: 'Profil utilisateur créé avec succès.' })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la création du profil utilisateur.' })
    }
  })

  // GET /user/fields - Lister tous les champs du profil (HKEYS)
  router.get('/fields', async (req, res) => {
    try {
      const fields = await client.hKeys('user:42')
      res.json({ fields })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des champs.' })
    }
  })

  // GET /user/values - Lister toutes les valeurs du profil (HVALS)
  router.get('/values', async (req, res) => {
    try {
      const values = await client.hVals('user:42')
      res.json({ values })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des valeurs.' })
    }
  })

  return router
}

module.exports = userRoutes
