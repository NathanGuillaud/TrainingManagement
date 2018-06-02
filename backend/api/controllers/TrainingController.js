const Training = require('../models/Training');
// const Subscription = require('../models/Subscription');
// const Invoice = require('../models/Invoice');

const TrainingController = () => {
  // Création d'un training
  const create = async (req, res) => {
    const { body } = req;

    // Contrôle
    // code postal
    const pattern = new RegExp('^[0-9]*$');
    const result = pattern.test(body.postalCode);
    if (!result) {
      return res.status(422).json({ message: 'Erreur - Le code postal est invalide.' });
    }

    if (body.postalCode.length !== 5) {
      return res.status(422).json({ message: 'Erreur - Le code postal est invalide.' });
    }

    // Création du training
    try {
      const training = await Training.create({
        name: body.name,
        description: body.description,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
      });
      return res.status(201).json(training);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
    }
  };

  // Modification du training
  const update = async (req, res) => {
    const { id } = req.params;
    // Récupération de corps de la requête
    const {
      name,
      description,
      address,
      city,
      postalCode,
    } = req.body;

    if (id && name && description && address && city && postalCode) {
      // Recherche du training
      try {
        const training = await Training.findById(id);
        // Training trouvé, on sauvegarde les modifications
        try {
          Training.update(
            {
              name,
              description,
              address,
              city,
              postalCode,
            },
            {
              where: { id },
            },
          );
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
        }
        return res.status(200).json({ training });
      } catch (err) {
        console.log(err);
        return res.status(404).json({ message: 'Erreur - Stage inexistant.' });
      }
    }

    return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
  };

  // Récupération du training
  const get = async (req, res) => {
    const { id } = req.params;
    try {
      const training = await Training.findById(id);

      return res.status(200).json(training);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
    }
  };

  // Suppression du training
  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const training = await Training.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json(training);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
    }
  };

  // Liste des trainings
  const getAll = async (req, res) => {
    try {
      const training = await Training.findAll();
      return res.status(200).json(training);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
    }
  };

  return {
    create,
    update,
    getAll,
    remove,
    get,
  };
};

module.exports = TrainingController;
