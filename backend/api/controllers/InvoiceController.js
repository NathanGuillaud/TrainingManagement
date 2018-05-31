const Invoice = require('../models/Invoice');
const Training = require('../models/Training');

const InvoiceController = () => {
  // Liste des factures par utilisateur
  const getAllByMemberId = async (req, res) => {
    const { memberId } = req.params;
    try {
      const invoices = await Invoice.findAll({
        where: {
          MemberId: memberId,
        },
        include: [{
          model: Training,
        }],
      });
      return res.status(200).json(invoices);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur serveur - la requête ne peut pas être traitée.' });
    }
  };

  return {
    getAllByMemberId,
  };
};

module.exports = InvoiceController;
