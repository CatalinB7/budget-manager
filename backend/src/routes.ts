import express from 'express';

import { db } from './db/db';
import {
  checkCategoryExists,
  deleteSpendingInCategory,
  editCategory,
  editSpendingInCategory,
  insertCategory,
  insertSpendingInCategory,
  removeCategory,
} from './db/db_API';
import {
  isInstanceOfISpending,
  isInstanceOfISpendingArray,
} from './model/ISpending';
import { CustomError } from './utils/CustomError';

const router = express.Router();

router.get('/budgets', (req, res) => {
    const userId = req.query.userId;
    res.send(db.budgets.filter(el => el.userId === userId));
});

router.get('/expenses_categories', (req, res) => {
    const userId = req.query.userId;
    res.send(db.expenses_categories.filter(el => el.userId === userId));
});


router.post('/expenses_categories/categories', (req, res) => {
    const userId = req.query.userId;
    const { name, expenses } = req.body;

    if (typeof userId !== 'string' || typeof name !== 'string' ||
        !isInstanceOfISpendingArray(expenses)) {
        throw new CustomError('Bad query params!', 400);
    }
    if (checkCategoryExists(userId, name)) {
        throw new CustomError('Category already defined!', 409);
    }

    insertCategory(userId, name, expenses);
    res.json({ status: "SUCCESS", statusCode: 200, response: { name, expenses } });
});

router.delete('/expenses_categories/categories', (req, res) => {
    const userId = req.query.userId;
    const name = req.query.name;

    if (typeof userId != 'string' || typeof name != 'string') {
        throw new CustomError('Bad query params!', 400);
    }
    if (!checkCategoryExists(userId, name)) {
        throw new CustomError('Category is not defined!', 404);
    }

    res.json({ status: "SUCCESS", statusCode: 200, response: removeCategory(userId, name) });
});

router.put('/expenses_categories/categories', (req, res) => {
    const userId = req.query.userId;
    const oldName = req.query.oldName;
    const newName = req.query.newName;

    if (typeof userId !== 'string' || typeof newName !== 'string' || typeof oldName !== 'string') {
        throw new CustomError('Bad query params!', 400);
    }
    if (!checkCategoryExists(userId, oldName)) {
        throw new CustomError(`Category ${oldName} is not defined!`, 404);
    }
    if (checkCategoryExists(userId, newName)) {
        throw new CustomError(`Category ${newName} already defined!`, 409);
    }

    res.json({ status: "SUCCESS", response: editCategory(userId, oldName, newName) });
});

router.post('/expenses_categories/spendings', (req, res) => {
    const userId = req.query.userId;
    const { category, spending } = req.body;

    if (typeof userId !== 'string' || typeof category !== 'string' ||
        !isInstanceOfISpending(spending)) {
        throw new CustomError('Bad query params!', 400);
    }
    if (!checkCategoryExists(userId, category)) {
        throw new CustomError('Category not defined!', 404);
    }

    res.json({
        status: "SUCCESS", statusCode: 200,
        response: insertSpendingInCategory(userId, category, spending)
    });
});

router.put('/expenses_categories/spendings', (req, res) => {
    const userId = req.query.userId;
    const { category, spending } = req.body;

    if (typeof userId !== 'string' || typeof category !== 'string' ||
        typeof req.query.spendingId !== 'string' || !isInstanceOfISpending(spending)) {
        throw new CustomError('Bad query params!', 400);
    }
    if (!checkCategoryExists(userId, category)) {
        throw new CustomError('Category not defined!', 404);
    }

    const spendingId = parseInt(req.query.spendingId);
    const toEdit = editSpendingInCategory(userId, spendingId, category, spending);
    res.json({ status: "SUCCESS", statusCode: 200, response: toEdit });
});

router.delete('/expenses_categories/spendings', (req, res) => {
    const userId = req.query.userId;
    const category = req.query.category;

    if (typeof userId !== 'string' || typeof category !== 'string' || typeof req.query.spendingId !== 'string') {
        throw new CustomError('Bad query params!', 400);
    }
    if (!checkCategoryExists(userId, category)) {
        throw new CustomError('Category not defined!', 404);
    }

    const spendingId = parseInt(req.query.spendingId);
    const toDelete = deleteSpendingInCategory(userId, spendingId, category);
    res.json({ status: "SUCCESS", statusCode: 200, response: toDelete });
});

export default router;