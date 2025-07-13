const express = require('express');
const router = express.Router();
const budgetSchema = require('../schemas/budget');
const Budget = require('../models/Budget');
const axios = require('axios');

axios.defaults.baseURL = process.env.DB_URL;

router.get('/', (req, res, next) => {
  res.json({ endPoint: 'GET /budgets' });
});

router.post('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const validation = budgetSchema.safeParse(req.body);
   if (!validation.success) {
    return res.status(400).json({
      errors: validation.error.format()
    });
  }
  const budget = new Budget(validation.data);
  axios
    .post('/budgets', budget)
    .then((response) => {
      res.status(201).end(JSON.stringify(response.data));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).end(JSON.stringify({ error: 'Unexpected error' }));
    });
});

module.exports = router;
