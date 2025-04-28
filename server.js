const express = require('express')
const redis = require('redis')

const authRoutes = require('./routes/auth.routes')
const sessionRoutes = require('./routes/session.routes')
const userRoutes = require('./routes/user.routes')
const cartRoutes = require('./routes/cart.routes')
const stockRoutes = require('./routes/stock.routes')

const app = express()
app.use(express.json())

const client = redis.createClient()
client
  .connect()
  .then(() => console.log('✅ Connecté à Redis'))
  .catch((err) => console.error('❌ Erreur de connexion Redis', err))

// les routes
app.use('/auth', authRoutes(client))
app.use('/session', sessionRoutes(client))
app.use('/user', userRoutes(client))
app.use('/cart', cartRoutes(client))
app.use('/stock', stockRoutes(client))

// Lancement du serveur
const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
})
