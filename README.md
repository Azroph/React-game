# Projet JDR LOTR

Ce projet est une application web de jeu de rôle en ligne basée sur l'univers du Seigneur des Anneaux, utilisant React pour le frontend et Fastify pour le backend.

## Prérequis

- Node.js (version 16 ou supérieure)
- MySQL (version 8.0 ou supérieure)
- npm ou yarn

## Structure du projet

Le projet est divisé en deux parties :
- `/frontend` : Application React
- `/backend` : Serveur Fastify

## Installation

### 1. Base de données

1. Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine
2. Connectez-vous à MySQL :
```bash
mysql -u root -p
```
3. Créez la base de données :
```sql
CREATE DATABASE database_name;
```

### 2. Backend

1. Naviguez vers le dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du dossier backend avec le contenu suivant :
```plaintext
DB_NAME=database_name
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_HOST=host_name
DB_PORT=XXXX
```

4. Lancez le serveur :
```bash
node src/server.js
```

Le serveur devrait démarrer sur http://localhost:3000. Vous devriez voir les messages suivants :
- "Connecté à la base de données MySQL!"
- "Base de données synchronisée."
- "Serveur Fastify lancé sur http://localhost:3000"

### 3. Frontend

1. Dans un nouveau terminal, naviguez vers le dossier frontend :
```bash
cd frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application :
```bash
npm run dev
```

L'application devrait démarrer et être accessible à l'adresse indiquée (généralement http://localhost:5173).

## Utilisation

1. Ouvrez votre navigateur et accédez à l'URL du frontend
2. Vous pouvez maintenant :
   - Créer un compte via le formulaire d'inscription
   - Vous connecter avec vos identifiants
   - Accéder au dashboard
   - Créer ou rejoindre une partie

## Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données** :
   - Vérifiez que MySQL est bien lancé
   - Vérifiez les informations de connexion dans le fichier `.env`
   - Assurez-vous que la base de données existe

2. **Le serveur ne démarre pas** :
   - Vérifiez qu'aucun autre service n'utilise le port 3000
   - Assurez-vous d'avoir installé toutes les dépendances
   - Vérifiez les logs d'erreur dans la console

3. **Erreurs frontend** :
   - Assurez-vous que le backend est bien lancé
   - Vérifiez la console du navigateur pour les messages d'erreur