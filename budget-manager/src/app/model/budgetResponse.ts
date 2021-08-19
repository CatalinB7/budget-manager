import { IBudget } from './budget';

export interface IBudgetResponseItem {
    budget: IBudget;
}

export type BudgetResponse = [IBudgetResponseItem];