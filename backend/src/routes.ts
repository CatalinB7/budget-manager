import express from 'express';

import {
  checkCategoryExists,
  CustomError,
  db,
  editCategory,
  insertCategory,
  removeCategory,
} from './db';

let router = express.Router();

//The following 2 routes return arrays but could return directly the object inside the array,
// but the frontend used them this way before

//'http://localhost:3000/budgets?userId=1'
router.get("/budgets", (req, res) => {
    let userId = req.query.userId as string;
    res.send(db.budgets.filter(el => el.userId == userId));
});
//http://localhost:3000/expenses_categories?userId=1
router.get("/expenses_categories", (req, res) => {
    let userId = req.query.userId as string;
    res.send(db.expenses_categories.filter(el => el.userId == userId));
});


router.post("/expenses_categories/categories", (req, res) => {
    let userId = req.query.userId as string;
    let { name, expenses } = req.body;
    if(checkCategoryExists(userId, name))
        throw new CustomError("Category already defined!", 409);
    insertCategory(userId, name, expenses);
    res.sendStatus(200);
});

router.delete("/expenses_categories/categories", (req, res) => {
    let userId = req.query.userId as string;
    let name = req.query.name as string;
    if(!checkCategoryExists(userId, name))
        throw new CustomError("Category is not defined!", 404);
    removeCategory(userId, name);
    res.sendStatus(200);
});

router.put("/expenses_categories/categories", (req, res) => {
    let userId = req.query.userId as string;
    let oldName = req.query.oldName as string;
    let newName = req.query.newName as string;
    if(!checkCategoryExists(userId, oldName))
        throw new CustomError(`Category ${oldName} is not defined!`, 404);
    if(checkCategoryExists(userId, newName))
        throw new CustomError(`Category ${newName} already defined!`, 409);
    editCategory(userId, oldName, newName);
    res.sendStatus(200);
});

export default router;