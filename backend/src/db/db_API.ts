import { ISpending } from '../model/ISpending';
import { CustomError } from '../utils/CustomError';
import { db } from './db';

const checkCategoryExists = (userId: string, newCategory: string) => {
    const userExpenses_categories = db.expenses_categories.filter(el => el.userId == userId);
    if(userExpenses_categories.length === 0)
        throw new CustomError(`Could not find user with userId = ${userId}`, 404);
    for (const el of userExpenses_categories[0].categories) {
        if (el.name == newCategory)
            return true;
    }
    return false;
}

const insertCategory = (userId: string, newCategory: string, expenses: ISpending[]) => {
    const userExpenses_categories = db.expenses_categories.filter(el => el.userId == userId)[0];
    const spendingsWithId = expenses.map((el, idx) => ({...el, id: idx}))
    userExpenses_categories.categories.push({ name: newCategory, expenses: spendingsWithId });
}

const removeCategory = (userId: string, name: string) => {
    const a = db.expenses_categories.filter(el => el.userId == userId)[0];
    let toDelete = {};
    a.categories = a.categories.filter(el => {
        if(el.name === name) {
            toDelete = el;
            return false;
        }
        return true;
    });
    return toDelete;
}

const editCategory = (userId: string, oldName: string, newName: string) => {
    const a = db.expenses_categories.filter(el => el.userId == userId)[0];
    let toEdit = {};
    a.categories = a.categories.map(el => {
        if(el.name == oldName) {
            el.name = newName;
            toEdit = el;
        }
        return el;
    });
    return toEdit;
}

const insertSpendingInCategory = (userId: string, category: string, spending: ISpending) => {
    const expenses = db.expenses_categories.filter(el => el.userId == userId)[0].categories
        .filter(el => el.name === category)[0].expenses;
    expenses.forEach(el => {
        if(el.name === spending.name)
            throw new CustomError("Item already defined!", 409);
    });
    const id = expenses.length + 1;
    const toInsert = {...spending, id};
    expenses.push(toInsert);
    return toInsert;
}

const editSpendingInCategory = (userId: string, spendingId: number, category: string, spending: ISpending) => {
    const expenses = db.expenses_categories.filter(el => el.userId == userId)[0].categories
        .filter(el => el.name === category)[0].expenses;
    const toEdit = {...spending, id: spendingId};
    let found = false;
    let sameNameCounter = 0;
    expenses.forEach((el, idx) => {
        if(el.id == spendingId) {
            expenses[idx] = toEdit;
            found = true;
        } else if(spending.name == el.name)
                sameNameCounter++;
    });
    if(!found)
        throw new CustomError(`Item with id ${spendingId} not found!`, 404);
    if(sameNameCounter >= 1)
        throw new CustomError("Item having same name already defined!", 409);
    return toEdit;
    }

const deleteSpendingInCategory = (userId: string, spendingId: number, category: string) => {
    const expenses = db.expenses_categories.filter(el => el.userId == userId)[0].categories
        .filter(el => el.name === category)[0].expenses;
    for (let i = 0; i < expenses.length; i++) {
        if(expenses[i].id == spendingId) {
            return expenses.splice(i, 1)[0];
        }
    }
    throw new CustomError(`Item with id ${spendingId} not found!`, 404);
}

export {
  checkCategoryExists,
  deleteSpendingInCategory,
  editCategory,
  editSpendingInCategory,
  insertCategory,
  insertSpendingInCategory,
  removeCategory,
};