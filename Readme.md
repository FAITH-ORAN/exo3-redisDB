# Application Node.js avec Redis - Démonstration

Ce projet est une application de démonstration développée avec Node.js et Express, utilisant Redis pour gérer diverses fonctionnalités telles que l'authentification, les sessions utilisateur, les paniers d'achat et les stocks.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io/) (le serveur Redis doit être en cours d'exécution)

## 🛠️ Installation

1.  Clonez ce dépôt de projet ou téléchargez les fichiers sources.
2.  Ouvrez un terminal et naviguez jusqu'au répertoire racine du projet.
3.  Installez les dépendances du projet en exécutant la commande suivante :
    ```bash
    npm install
    ```

## ▶️ Lancement de l'application

Pour démarrer le serveur Node.js, exécutez la commande suivante dans votre terminal :

```bash
node server.js
```

Le serveur démarrera et sera accessible à l'adresse : `http://localhost:3000`

## 🚀 Fonctionnalités et Endpoints API

Vous pouvez consulter la documentation complète de l'API sur Postman en suivant ce lien :  
[Documentation Postman](https://documenter.getpostman.com/view/17140582/2sB2j1iYXd)

Voici comment utiliser les principales fonctionnalités avec Postman ou un autre client HTTP :

### 1. Authentification

- **Créer un token d'authentification**
  - `POST /auth`
- **Vérifier la durée de vie (TTL) du token**
  - `GET /auth`

### 2. Session Utilisateur

- **Créer une session utilisateur**
  - `POST /session`
- **Vérifier la durée de vie (TTL) de la session**
  - `GET /session`

### 3. Informations Utilisateur (Profil)

- **Stocker les informations d'un utilisateur dans un Hash Redis**
  - `POST /user`
- **Voir tous les champs du profil utilisateur**
  - `GET /user/fields`
- **Voir toutes les valeurs du profil utilisateur**
  - `GET /user/values`

### 4. Gestion du Panier

- **Ajouter plusieurs produits au panier**
  - `POST /cart/add`
- **Voir le contenu actuel du panier**
  - `GET /cart`
- **Supprimer le dernier produit ajouté au panier**
  - `DELETE /cart/remove-last`
- **Décrémenter les stocks et ajouter les produits au panier (Checkout)**
  - `POST /cart/checkout`
- **Ajouter une expiration de 15 minutes au panier**
  - `POST /cart/expire`
- **Voir le temps restant avant expiration du panier (TTL)**
  - `GET /cart/ttl`

### 5. Gestion du Stock

- **Initialiser les stocks des produits (product:1001 et product:1002)**
  - `POST /stock/init`
- **Voir le stock actuel des produits**
  - `GET /stock`

### 6. Déconnexion

- **Simuler une déconnexion (supprime le token et la session)**
  - `POST /auth/logout`
