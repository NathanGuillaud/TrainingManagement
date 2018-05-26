# Frontend

### Sources

https://github.com/cornflourblue/angular2-registration-login-example-cli.git
Ce frontend permet de faire les pages en Angular correspondantes au backend.
Tuto que j'ai suivi : [Angular 2/5 User Registration and Login Example & Tutorial](http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial)

### Ajouts

* Modification des urls pour faire la correspondance avec le backend.
* Mise à jour du guard Angular pour protéger les routes par rapport au rôle de l'utilisateur (admin ou user), en plus de la protection avec le token.
* Ajout de la déconnexion d'un utilisateur.
* Nouvelles fonctions qui permettent de savoir si l'utilisateur est admin ou user.
* Ajout d'un header pour gérer le bandeau de menu.
* Ajout du module training pour gérer les stages :
    * composant qui gère la page HTML
    * service qui gère les appels HTTP
    * modèle qui établi la liaison avec le backend
    * mise à jour du routing Angular avec ces nouvelles routes
    * mise à jour des tests par défaut pour qu'ils soient passants

### Besoins

- authentification avec [JWT](https://jwt.io/) and [REST API with JWT](https://github.com/aichbauer/express-rest-api-boilerplate)
- Utilisation de Angular et Angularcli
- Mise en page avec Bootstrap
- Utilisation de [eslint](https://github.com/eslint/eslint) pour l'analyse statique du code (meilleure qualité du code)
- Tests avec Jasmine (framework) et Karma
- built avec [npm/yarn scripts](#npm/yarn-scripts)
- Pour démarrer l'application, taper `yarn start`