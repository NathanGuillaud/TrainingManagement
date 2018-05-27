const Invoice = require('../models/Invoice');
const Training = require('../models/Training');

const InvoiceController = () => {
  // Liste des factures par utilisateur
  const getAllByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const invoices = await Invoice.findAll({
        where: {
          UserId: userId,
        },
        include: [{
          model: Training,
        }],
      });
      return res.status(200).json(invoices);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée' });
    }
  };

  return {
    getAllByUserId,
  };
};

module.exports = InvoiceController;
