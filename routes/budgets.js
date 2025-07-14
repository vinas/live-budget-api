const express = require('express');
const router = express.Router();
const budgetSchema = require('../schemas/budget');
const Budget = require('../models/Budget');
const axios = require('axios');

axios.defaults.baseURL = process.env.DB_URL;

const getNextId = async (res) => {
  return await axios
    .get('/budgets?_sort=-id&_start=0&_end=1')
    .then((response) => (response.data.length > 0) ? parseInt(response.data[0].id) + 1 : 1)
    .catch((err) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json(err);
    });
};

router.get('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const results = [];
  await axios
    .get('/budgets')
    .then((response) => {
      const budgetAmount = response.data.length;
      if (budgetAmount > 0) {
        const budgetList = [];
        for (let i = 0; i < budgetAmount; i++) {
          budgetList.push(new Budget(response.data[i]));
        }
        res.status(200).json(budgetList);
        return;
      }
      res.status(200).json([]);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/:id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.params.id) {
    await axios
      .get(`/budgets?id=${req.params.id}`)
      .then((response) => {
        if (response.data.length > 0) {
          const budget =  new Budget(response.data[0]);
          res.status(200).json(budget);
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const validation = budgetSchema.safeParse(req.body);
   if (!validation.success) {
    return res.status(400).json({
      errors: validation.error.format()
    });
  }
  const budget = new Budget(validation.data);
  budget.id = await getNextId(res);
  res.json(budget);
  await axios
    .post('/budgets', budget)
    .then((response) => {
      res.status(201).end(JSON.stringify(response.data));
    })
    .catch((err) => {
      res.status(400).end(JSON.stringify({ error: 'Unexpected error' }));
    });
});

router.delete('/:id', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.params.id) {
    await axios
      .delete(`/budgets/${req.params.id}`)
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

module.exports = router;
