const express = require('express')

function stockRoutes(client) {
  const router = express.Router()

  // POST /stock/init - Initialiser le stock du produit
  router.post('/init', async (req, res) => {
    try {
      await client.set('stock:product:1001', 50)
      await client.set('stock:product:1002', 30)
      res.status(201).json({ message: 'Stock initialisé à 50.' })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: "Erreur lors de l'initialisation du stock." })
    }
  })

  // POST /stock/decrement - Décrémenter le stock de 1
  router.post('/decrement', async (req, res) => {
    try {
      const stock = await client.decr('stock:product:1001')
      res.json({ message: 'Stock décrémenté.', stock })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erreur lors du décrément du stock.' })
    }
  })

  // GET /stock - Récupérer les valeurs actuelles des stocks
  router.get('/', async (req, res) => {
    try {
      const stock1 = await client.get('stock:product:1001')
      const stock2 = await client.get('stock:product:1002')
      res.json({
        'product:1001': parseInt(stock1, 10),
        'product:1002': parseInt(stock2, 10),
      })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des stocks.' })
    }
  })

  return router
}

module.exports = stockRoutes
