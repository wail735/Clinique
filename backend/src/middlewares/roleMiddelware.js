
export const checkRole =
  (...allowedRole) =>
  (req, res, next) => {
    if (!req.user || !allowedRole.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Accès refusé : rôle insuffisant" });
    }
    return next();
  };
