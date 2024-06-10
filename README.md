# Muthufy

## Étapes d'installation et de lancement du projet

Ce document décrit les étapes nécessaires pour installer et lancer le projet. Suivez ces instructions pour configurer votre environnement et démarrer le serveur localement.

### 1. Exécuter les scripts SQL

Tout d'abord, vous devez exécuter les scripts SQL pour configurer votre base de données. Assurez-vous d'avoir un serveur SQL en cours d'exécution et de disposer des privilèges nécessaires pour créer et modifier des bases de données et des tables.

1. Ouvrez votre client SQL (comme MySQL Workbench, DBeaver, etc.).
2. Chargez et exécutez les scripts SQL fournis dans le dossier `sql`.

### 2. Lancer l'API en localhost

Une fois la base de données configurée, vous pouvez lancer l'API locale.

1. Ouvrez un terminal.
2. Naviguez vers le répertoire contenant votre API.
3. Lancez l'API en utilisant la commande suivante si vous n'avez pas de serveur local comme apache2:

   ```bash
   php -S localhost:8080


### 3. Installer les dépendances du projet React

Ensuite, vous devez installer les dépendances pour le projet React. Le projet React se trouve dans le dossier `Muthufy`.

- Ouvrez un nouveau terminal.
- Naviguez vers le répertoire `Muthufy` :

```bash
cd Muthufy
```

### 4. Lancer le serveur de développement React

Une fois les dépendances installées, vous pouvez lancer le serveur de développement pour voir le projet React.

- Dans le répertoire `Muthufy`, lancez le serveur de développement avec la commande suivante :

```bash
npm run dev
```

Le projet React sera accessible à l'adresse locale fournie par le terminal, généralement http://localhost:5173/.
