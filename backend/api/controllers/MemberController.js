const Member = require('../models/Member');
const Role = require('../models/Role');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

// Mail config
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://ng-training-management.heroku.com/api' : 'http://localhost:8080/api';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const send = require('gmail-send')({
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASSWORD,
});

const MemberController = () => {
  // Création d'un utilisateur
  // L'utilisateur est créé avec le role ROLE_USER par défaut
  const register = async (req, res) => {
    const { body } = req;

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

    if (roleObj.id) {
      // Création de l'utilisateur
      try {
        const member = await Member.create({
          username: body.username,
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: body.password,
          enabled: false,
          address: body.address,
          city: body.city,
          postalCode: body.postalCode,
          birthDate: body.birthDate,
          gender: body.gender,
        });
        // Ajout du rôle
        await member.setAuthorities(roleObj);

        // Création du token JWT durée de vie 24h
        // et le mot de passe comme secret pour générer le token
        const token = authService().issue({}, member.password, 86400);

        // Envoi d'un mail pour activation du compte
        send({
          to: member.email,
          subject: 'Activation de votre compte',
          text: `Bonjour, 
          Merci de bien vouloir cliquer sur ce lien pour activer votre compte (valide pendant 24h)
          ${baseUrl}/public/account/verify?token=${token}&username=${member.username}`,
        }, (errtk, restk) => {
          console.log('Mail envoyé: err:', errtk, '; res:', restk);
        });

        return res.status(200).json({ member });
      } catch (err) {
        console.log(err);
        // L'utilisateur existe déjà
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ message: 'Cet utilisateur ou ce mail existe déjà.' });
        }
        // Pour tous les autres cas
        return res.status(500).json({ message: err });
      }
    } else {
      return res.status(500).json({ message: 'Cet utilisateur ne peut pas être créé - ROLE_USER inexistant' });
    }
  };

  // Member login
  const login = async (req, res) => {
    // Récupération de coprs de la requête
    const { username, password } = req.body;

    if (username && password) {
      // Recherche de l'utilisateur et récupération des rôles
      try {
        const member = await Member.findOne({
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
        if (!member) {
          return res.status(400).json({ message: 'Utilisateur inconnu.' });
        }

        // Utilisateur trouvé, on vérifie s'il est actif
        if (member.enabled) {
          // Utilisateur trouvé, déchiffrement du mot de passe
          if (bcryptService().comparePassword(password, member.password)) {
            const roles = [];
            member.authorities.forEach((role) => {
              roles.push(role.name);
            });

            // Création du token JWT
            const token = authService().issue({
              id: member.id,
              username: member.username,
              firstname: member.firstname,
              lastname: member.lastname,
              email: member.email,
              authorities: roles,
            }, '', 10800);

            return res.status(200).json({ token });
          }
        } else {
          return res.status(401).json({ message: 'Accès non autorisé - utilisateur inactif' });
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
      const members = await Member.findAll();

      return res.status(200).json({ members });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Validate registration by mail
  const verifyAccount = async (req, res) => {
    const { token, username } = req.query;
    // Recherche de l'utilisateur
    try {
      const member = await Member.findOne({
        where: {
          username,
        },
      });
      if (member.id) {
        // Vérification du token
        const activationToken = authService().verify(token, member.password, (err, tokenRet) => {
          if (err) {
            return res.status(401).json({ isvalid: false, err: 'Votre compte n\'a pas pu être activé - token invalide' });
          }
          return tokenRet;
        });
        console.log(activationToken);
        if (!member.enabled) {
          // Activation du compte
          try {
            Member.update(
              {
                enabled: true,
              },
              {
                where: { username },
              },
            );
            return res.status(200).json({ message: 'Votre compte a été activé' });
          } catch (err) {
            console.log(err);
            return res.status(404).json({ message: 'Votre compte n\'a pas pu être activé - problème lors de la mise à jour' });
          }
        } else {
          return res.status(422).json({ message: 'Votre compte est déjà activé' });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: 'Votre compte n\'a pas pu être activé - utilisateur non trouvé' });
    }

    return res.status(500).json({ message: 'Votre compte n\'a pas pu être activé' });
  };

  return {
    register,
    login,
    validate,
    getAll,
    verifyAccount,
  };
};

module.exports = MemberController;
