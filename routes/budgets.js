const express = require('express');
const router = express.Router();

axios.defaults.baseURL = process.env.VISY_ONE_JSON_SERVER_URL;

router.get('/', (req, res, next) => {
  res.json({ endPoint: 'GET /budgets' });
});

router.post('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    endPoint: 'POST /budgets/new',
    payload: req.body
  });
});

module.exports = router;
