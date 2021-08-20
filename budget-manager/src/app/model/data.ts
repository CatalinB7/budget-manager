import { IBudget } from './budget';
import { ISpendingCategory } from './spendingCategory';
import { ISpendingTotal } from './spendingTotal';

export interface IAppData { 
    budget: IBudget, 
    spendingList: ISpendingCategory[],
    spendingTotals: ISpendingTotal[],
} 