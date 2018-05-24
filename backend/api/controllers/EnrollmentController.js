const Enrollment = require('../models/Enrollment');
const Session = require('../models/Session');
const User = require('../models/User');

const EnrollmentController = () => {
  // Création d'une inscription
  const create = async (req, res) => {
    // req.params = paramètre de l'URL
    const { userId, sessionId } = req.params;
    try {
      await User.findById(userId);
      try {
        await Session.findById(sessionId);
        // Création de l'inscription
        try {
          const enrollment = await Enrollment.create({
            SessionId: sessionId,
            UserId: userId,
          });
          return res.status(200).json(enrollment);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Erreur - utilisateur non trouvé' });
    }
  };

  // Suppression d'une inscription
  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const enrollment = await Enrollment.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json(enrollment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Liste des inscriptions
  // TODO

  return {
    create,
    remove,
  };
};

module.exports = EnrollmentController;
