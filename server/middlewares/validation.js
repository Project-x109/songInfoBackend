const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const validateCreateSong = [
  check('title').notEmpty().withMessage('Song Title is Required'),
  check('artist').notEmpty().withMessage('Artist Name  is Required'),
  check('album').notEmpty().withMessage('Album Name is Required'),
  check('genre').notEmpty().withMessage('Genre Name is Required')
]

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ success: false, errors: errorMessages });
  }
  next();
};

module.exports = {
  validateCreateSong,
  handleValidationErrors
};
