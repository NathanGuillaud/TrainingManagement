const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

const EnrollmentController = () => {
  // Création d'une inscription
  const create = async (req, res) => {
    // req.params = paramètre de l'URL
    const { userId, courseId } = req.params;
    try {
      await User.findById(userId);
      try {
        await Course.findById(courseId);
        // Création de l'inscription
        try {
          const enrollment = await Enrollment.create({
            CourseId: courseId,
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

  // Liste des inscriptions par utilisateur et par stage
  // SELECT *
  // FROM Enrollment
  // WHERE UserId = userId
  // AND CourseId IN
  //                (SELECT Course.id
  //                FROM Course
  //                WHERE Course.TrainingId = trainingId)
  const getAllByUserIdTrainingId = async (req, res) => {
    const { userId, trainingId } = req.params;
    try {
      const enrollments = await Enrollment.findAll({
        where: {
          UserId: userId,
        },
        include: [{
          model: Course,
          where: {
            TrainingId: trainingId,
          },
          attributes: [],
        }],
      });
      return res.status(200).json(enrollments);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  const getAllByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = await Enrollment.findAll({
        where: {
          UserId: userId,
        },
        include: [{
          model: Course,
        }],
      });
      return res.status(200).json(enrollments);
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
    getAllByUserIdTrainingId,
    getAllByUserId,
  };
};

module.exports = EnrollmentController;
