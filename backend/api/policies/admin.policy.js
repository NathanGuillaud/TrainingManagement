// Check ROLE_ADMIN belongs to user
module.exports = (req, res, next) => {
  if (req.token.authorities.indexOf('ROLE_ADMIN') > -1) {
    return next();
  }
  return res.status(403).json({ message: 'Accès non autorisé' });
};
