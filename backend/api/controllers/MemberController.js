const Member = require('../models/Member');
const Role = require('../models/Role');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

// Mail config
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://ng-training-management.herokuapp.com/api' : 'http://localhost:8080/api';
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

        return res.status(201).json({ member });
      } catch (err) {
        console.log(err);
        // L'utilisateur existe déjà
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ message: 'Erreur - Ce membre ou ce mail existe déjà.' });
        }
        // Pour tous les autres cas
        return res.status(500).json({ message: err });
      }
    } else {
      return res.status(404).json({ message: 'Erreur - Ce membre ne peut pas être créé - ROLE_USER inexistant.' });
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
          return res.status(403).json({ message: 'Erreur - Accès non autorisé - membre inactif.' });
        }
      } catch (err) {
        console.log(err);
        return res.status(404).json({ message: 'Erreur - Membre inexistant.' });
      }
    }
    return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
  };

  // Validation du token JWT
  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Erreur - Jeton invalide.' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  // Liste des membres
  const getAll = async (req, res) => {
    // On postionne des valeurs par défaut pour la pagination
    // On ne retourne au maximum que defaultLimit enregistrements
    const defaultOffset = 0;
    const defaultLimit = 10;
    let { offset, limit } = req.query;

    // On récupère les paramètres
    if (req.query) {
      // On positionne l'offset par défaut si non présent
      if (!offset) {
        offset = defaultOffset;
      }

      // On positionne la limite par défaut si non présent
      if (!limit) {
        limit = defaultLimit;
      }

      // Si la limite dépasse le seul max, on met la valeur par défaut
      if (limit > defaultLimit) {
        limit = defaultLimit;
      }
    } else {
      // Si pas de paramètres, on met les valeurs par défaut
      offset = defaultOffset;
      limit = defaultLimit;
    }
    try {
      // Renvoyer le nombre total de membres pour connaitre le nombre de pages du tableau
      const membersCount = await Member.count();

      try {
        const members = await Member.findAll({ offset, limit });
        return res.status(200).json({ membersCount, members });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Validation de l'inscription par mail
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
            return res.status(200).json({ message: 'Votre compte a été activé !' });
          } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
          }
        } else {
          return res.status(409).json({ message: 'Erreur - Votre compte est déjà activé.' });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: 'Erreur - Membre existant.' });
    }

    return res.status(500).json({ message: 'Erreur - Votre compte n\'a pas pu être activé.' });
  };

  // Liste des membres d'un stage (avec pagination)
  const getAllByTrainingId = async (req, res) => {
    // On postionne des valeurs par défaut pour la pagination
    // On ne retourne au maximum que defaultLimit enregistrements
    const defaultOffset = 0;
    const defaultLimit = 10;
    let { offset, limit } = req.query;

    // On récupère les paramètres
    if (req.query) {
      // On positionne l'offset par défaut si non présent
      if (!offset) {
        offset = defaultOffset;
      }

      // On positionne la limite par défaut si non présent
      if (!limit) {
        limit = defaultLimit;
      }

      // Si la limite dépasse le seul max, on met la valeur par défaut
      if (limit > defaultLimit) {
        limit = defaultLimit;
      }
    } else {
      // Si pas de paramètres, on met les valeurs par défaut
      offset = defaultOffset;
      limit = defaultLimit;
    }

    // Récupération des séances du training
    const { trainingId } = req.params;
    try {
      const courses = await Course.findAll({
        where: {
          TrainingId: trainingId,
        },
      });
      // Recherche des inscriptions pour les séances avec le memberId
      try {
        // Tableau des IDs des séances
        const coursesIds = [];
        courses.forEach((course) => {
          coursesIds.push(course.id);
        });
        const enrollments = await Enrollment.findAll({
          where: {
            CourseId: {
              [Op.in]: coursesIds,
            },
          },
        });
        // Récupération des membres correspondants aux inscriptions
        try {
          // Tableau des IDs des membres dans les inscriptions
          const membersIds = [];
          enrollments.forEach((enrollment) => {
            // Rajouter l'ID du membre que s'il n'est pas déjà dans le tableau
            if (membersIds.indexOf(enrollment.MemberId) === -1) {
              membersIds.push(enrollment.MemberId);
            }
          });
          // Récupération des membres grâce au table d'IDs
          const members = await Member.findAll({
            where: {
              id: {
                [Op.in]: membersIds,
              },
            },
            offset,
            limit,
          });
          const membersCount = membersIds.length;
          return res.status(200).json({ membersCount, members });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
    }
  };

  return {
    register,
    login,
    validate,
    getAll,
    verifyAccount,
    getAllByTrainingId,
  };
};

module.exports = MemberController;
