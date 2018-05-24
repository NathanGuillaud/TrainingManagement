const Session = require('../models/Session');
const Training = require('../models/Training');

const SessionController = () => {
  // Création d'une session
  const create = async (req, res) => {
    const { trainingId } = req.params;
    try {
      await Training.findById(trainingId);
      const { body } = req;
      // Création de la session
      try {
        const session = await Session.create({
          begin: body.begin,
          end: body.end,
          price: body.price,
          TrainingId: trainingId,
        });
        return res.status(200).json(session);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Modification d'une session
  const update = async (req, res) => {
    // Récupération de corps de la requête
    const {
      id,
      begin,
      end,
      price,
    } = req.body;

    if (id && begin && end && price) {
      // Recherche de la session
      try {
        await Session.findById(id);
        // Session trouvée, on sauvegarde les modifications
        let session;
        try {
          Session.update(
            {
              begin,
              end,
              price,
            },
            {
              where: { id },
            },
          );
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
        }
        try {
          session = await Session.findById(id);
        } catch (err) {
          console.log(err);
          return res.status(400).json({ message: 'Séance non trouvée après mise à jour.' });
        }
        return res.status(200).json(session);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Séance non trouvée.' });
      }
    }

    return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
  };

  // Récupération d'une session
  const get = async (req, res) => {
    const { id } = req.params;
    try {
      const session = await Session.findById(id);

      return res.status(200).json(session);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Suppression d'une session
  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const session = await Session.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json(session);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Liste des sessions
  const getAll = async (req, res) => {
    try {
      const sessions = await Session.findAll();
      return res.status(200).json(sessions);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Liste des sessions par stage
  const getAllByTrainingId = async (req, res) => {
    const { trainingId } = req.params;
    try {
      const sessions = await Session.findAll({
        where: {
          TrainingId: trainingId,
        },
      });
      return res.status(200).json(sessions);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  return {
    create,
    update,
    getAll,
    remove,
    get,
    getAllByTrainingId,
  };
};

module.exports = SessionController;
