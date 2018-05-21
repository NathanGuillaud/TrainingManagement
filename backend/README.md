# Backend

### Sources

https://github.com/aichbauer/express-rest-api-boilerplate.git
* échange de token plutôt que cookie
* utilisation de nodejs
* utilisation du framework expressjs qui simplifie la gestion des routes

### Ajouts

* Gestion des rôles (rôle admin et user), chaque utilisateur peut avoir plusieurs rôles.
* Création d'une auth.policy qui permet de sécuriser les routes par rapport au rôle de l'utilisateur (et pas seulement par rapport au token).
* Ajout d'une route privateAdmin, en plus des routes private et public. Elle permet de définir les routes disponibles pour les utilisateurs avec le rôle admin uniquement.
* Mise à jour des tests par rapport aux modifications effectuées.
* Suppression des codes inutiles.
* Ajout de la gestion des stages :
    * ajout d'un modèle
    * ajout d'un controleur (avec toutes les opérations CRUD)
    * ajout des test
    * mise à jour des routes

### Besoins

- authentification avec [JWT](https://jwt.io/) and [REST API with JWT](https://github.com/aichbauer/express-rest-api-boilerplate)
- Mapping des routes avec [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- Utilisation de [Sequelize](http://docs.sequelizejs.com/) comme ORM avec mysql
- Environnement de développement avec [mysql](https://www.mysql.com/) et tests avec [sqlite](https://www.sqlite.org/)
- Utilisation de [eslint](https://github.com/eslint/eslint) pour l'analyse statique du code (meilleure qualité du code)
- Tests d'intégration avec [Jest](https://github.com/facebook/jest)
- built avec [npm/yarn scripts](#npm/yarn-scripts)
- Pour démarrer l'application, taper `yarn start`