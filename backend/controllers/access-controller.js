const { roles } = require('../services/roles');

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      console.log(req.role)
      const permission = roles.can(req.role)[action](resource);
      
      if (!permission.granted) {
        return next(new Error("You don't have enough permission to perform this action."));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
