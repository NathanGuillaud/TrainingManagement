const User = require('../models/User');
const Role = require('../models/Role');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
  // Création d'un utilisateur
  // L'utilisateur est créé avec le role ROLE_USER par défaut
  const register = async (req, res) => {
    const { body } = req;

    // if (body.password === body.password2) {
    const roleUser = 'ROLE_USER';
    let roleObj = new Role();

    // Récupération du rôle en base de données pour l'ajouter à l'utilisateur
    try {
      const role = await Role.findOne({
        where: {
          name: roleUser,
        },
      });
      roleObj = role;
    } catch (err) {
      console.log(err);
    }

    // Création de l'utilisateur
    try {
      const user = await User.create({
        username: body.username,
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        enabled: true,
      });
      // Ajout du rôle et création du token
      await user.setAuthorities(roleObj);
      const token = authService().issue({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: [roleObj.name],
      });

      return res.status(200).json({ token, user });
    } catch (err) {
      console.log(err);
      // L'utilisateur existe déjà
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Cet utilisateur existe déjà.' });
      }
      // Pour tous les autres cas
      return res.status(500).json({ message: err });
    }

    // }
    // return res.status(400).json({ message: 'Passwords don\'t match' });
  };

  // User login
  const login = async (req, res) => {
    // Récupération de coprs de la requête
    const { username, password } = req.body;

    if (username && password) {
      // Recherche de l'utilisateur et récupération des rôles
      try {
        const user = await User.findOne({
          include: [
            {
              model: Role,
              as: 'authorities',
              attributes: ['name'],
            },
          ],
          where: {
            username,
          },
        });
        // Utilisateur non trouvé
        if (!user) {
          return res.status(400).json({ message: 'Utilisateur inconnu.' });
        }

        // Utilisateur trouvé, déchiffrement du mot de passe
        if (bcryptService().comparePassword(password, user.password)) {
          const roles = [];
          user.authorities.forEach((role) => {
            roles.push(role.name);
          });

          // Création du token JWT
          const token = authService().issue({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            authorities: roles,
          });

          return res.status(200).json({ token });
        }

        // Utilisateur trouvé mais mot de passe erroné
        return res.status(401).json({ message: 'Accès non autorisé' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
      }
    }
    return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
  };

  // Validation du token JWT
  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Jeton invalide !' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  // Liste des utilisateurs
  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  return {
    register,
    login,
    validate,
    getAll,
  };
};

module.exports = UserController;
