const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('Live Budget API');
});

module.exports = router;
