const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Member = require('../models/Member');

const EnrollmentController = () => {
  // Création d'une inscription
  const create = async (req, res) => {
    // req.params = paramètre de l'URL
    const { memberId, courseId } = req.params;
    try {
      await Member.findById(memberId);
      try {
        await Course.findById(courseId);
        // Création de l'inscription
        try {
          const enrollment = await Enrollment.create({
            CourseId: courseId,
            MemberId: memberId,
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
  // WHERE MemberId = memberId
  // AND CourseId IN
  //                (SELECT Course.id
  //                FROM Course
  //                WHERE Course.TrainingId = trainingId)
  const getAllByMemberIdTrainingId = async (req, res) => {
    const { memberId, trainingId } = req.params;
    try {
      const enrollments = await Enrollment.findAll({
        where: {
          MemberId: memberId,
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

  const getAllByMemberId = async (req, res) => {
    const { memberId } = req.params;
    try {
      const enrollments = await Enrollment.findAll({
        where: {
          MemberId: memberId,
        },
        include: [{
          model: Course,
        }],
        order: [[{ model: Course }, 'TrainingId', 'ASC']],
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
    getAllByMemberIdTrainingId,
    getAllByMemberId,
  };
};

module.exports = EnrollmentController;
