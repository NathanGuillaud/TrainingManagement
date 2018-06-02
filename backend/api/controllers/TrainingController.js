const Training = require('../models/Training');
// const Subscription = require('../models/Subscription');
// const Invoice = require('../models/Invoice');

const TrainingController = () => {
  // Création d'un exemple
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

    // Création de l'exemple
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

  // Modification d'un exemple
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

    // Contrôle
    // code postal
    // const pattern = new RegExp('^[0-9]*$');
    // const result = pattern.test(postalCode);
    // if (!result) {
    //   return res.status(422).json({ message: 'Erreur - Le code postal est invalide.' });
    // }

    // if (postalCode.length !== 5) {
    //   return res.status(422).json({ message: 'Erreur - Le code postal est invalide.' });
    // }

    if (id && name && description && address && city && postalCode) {
      // Recherche de l'exemple'
      try {
        const training = await Training.findById(id);
        // Exemple trouvé, on sauvegarde les modifications
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

  // Récupération d'un exemple
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

  // Suppression d'un exemple
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

  // Liste des exemples
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
