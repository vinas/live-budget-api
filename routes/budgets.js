const express = require('express');
const router = express.Router();
const budgetSchema = require('../schemas/budget');
const Budget = require('../models/Budget');

// axios.defaults.baseURL = process.env.VISY_ONE_JSON_SERVER_URL;

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
  res.status(201).json({
    endPoint: 'POST /budgets/new',
    populated: budget
  });
});

module.exports = router;
