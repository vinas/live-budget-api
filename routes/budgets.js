const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ endPoint: 'GET /budgets' });
});

router.post('/', (req, res, next) => {
  res.json({
    endPoint: 'POST /budgets/new',
    payload: req.body
  });
});

module.exports = router;
