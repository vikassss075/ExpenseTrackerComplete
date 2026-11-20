const express = require('express');
const router = express.Router();

const expenseController = require('../controller/expenseController');

router.post('/', expenseController.addExpense);
router.get('/', expenseController.getExpenses);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', expenseController.editExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;