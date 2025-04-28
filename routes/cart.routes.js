const express = require('express')

function cartRoutes(client) {
  const router = express.Router()

  // POST /cart/add - Ajouter des produits au panier
  router.post('/add', async (req, res) => {
    try {
      await client.rPush('cart:user42', 'product:1001')
      await client.rPush('cart:user42', 'product:1002')
      await client.rPush('cart:user42', 'product:1003')
      res.status(201).json({ message: 'Produits ajoutés au panier.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Erreur lors de l'ajout au panier." })
    }
  })

  // GET /cart - Afficher le contenu du panier
  router.get('/', async (req, res) => {
    try {
      const cart = await client.lRange('cart:user42', 0, -1)
      res.json({ cart })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération du panier.' })
    }
  })

  // DELETE /cart/remove-last - Supprimer le dernier produit du panier
  router.delete('/remove-last', async (req, res) => {
    try {
      const removedProduct = await client.rPop('cart:user42')
      if (!removedProduct) {
        return res
          .status(404)
          .json({ message: 'Panier vide, aucun produit à supprimer.' })
      }
      res.json({ message: 'Dernier produit supprimé.', removedProduct })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la suppression du dernier produit.' })
    }
  })

  router.post('/checkout', async (req, res) => {
    try {
      const stockProduct1001 = parseInt(
        await client.get('stock:product:1001'),
        10
      )
      const stockProduct1002 = parseInt(
        await client.get('stock:product:1002'),
        10
      )

      if (stockProduct1001 <= 0) {
        return res.status(400).json({ error: 'Stock épuisé pour product:1001' })
      }
      if (stockProduct1002 <= 0) {
        return res.status(400).json({ error: 'Stock épuisé pour product:1002' })
      }

      // Démarrer la transaction car les stocks sont OK
      const transaction = client.multi()

      transaction.decr('stock:product:1001')
      transaction.decr('stock:product:1002')

      transaction.rPush('cart:user42', 'product:1001')
      transaction.rPush('cart:user42', 'product:1002')

      const results = await transaction.exec()

      res.status(200).json({
        message: 'Transaction exécutée avec succès.',
        results,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erreur lors de la transaction.' })
    }
  })

  router.post('/expire', async (req, res) => {
    try {
      await client.expire('cart:user42', 900) // 900 secondes = 15 minutes
      res
        .status(200)
        .json({ message: 'Expiration du panier définie à 15 minutes.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Erreur lors de la définition de l'expiration du panier.",
      })
    }
  })

  // GET /cart/ttl - Vérifier le TTL du panier
  router.get('/ttl', async (req, res) => {
    try {
      const ttl = await client.ttl('cart:user42')
      res.status(200).json({ ttl })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération du TTL du panier.' })
    }
  })

  return router
}

module.exports = cartRoutes
