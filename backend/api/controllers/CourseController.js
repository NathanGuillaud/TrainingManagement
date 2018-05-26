const Course = require('../models/Course');
const Training = require('../models/Training');

const CourseController = () => {
  // Création d'une course
  const create = async (req, res) => {
    const { trainingId } = req.params;
    try {
      await Training.findById(trainingId);
      const { body } = req;
      // Création de la course
      try {
        const course = await Course.create({
          day: body.day,
          begin: body.begin,
          end: body.end,
          price: body.price,
          TrainingId: trainingId,
        });
        return res.status(200).json(course);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Modification d'une course
  const update = async (req, res) => {
    // Récupération de corps de la requête
    const {
      id,
      day,
      begin,
      end,
      price,
    } = req.body;

    if (id && day && begin && end && price) {
      // Recherche de la course
      try {
        await Course.findById(id);
        // Course trouvée, on sauvegarde les modifications
        let course;
        try {
          Course.update(
            {
              day,
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
          course = await Course.findById(id);
        } catch (err) {
          console.log(err);
          return res.status(400).json({ message: 'Séance non trouvée après mise à jour.' });
        }
        return res.status(200).json(course);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Séance non trouvée.' });
      }
    }

    return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
  };

  // Récupération d'une course
  const get = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.findById(id);

      return res.status(200).json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Suppression d'une course
  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json(course);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Liste des courses
  const getAll = async (req, res) => {
    try {
      const courses = await Course.findAll();
      return res.status(200).json(courses);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  // Liste des courses par stage
  const getAllByTrainingId = async (req, res) => {
    const { trainingId } = req.params;
    try {
      const courses = await Course.findAll({
        where: {
          TrainingId: trainingId,
        },
      });
      return res.status(200).json(courses);
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

module.exports = CourseController;
