import { ISpending } from './spending';

export interface ISpendingCategory {
    name: string
    expenses: ISpending[],
}

export interface IComputedSpendCateg {
    name: string;
    total: number;
    expenses: ISpending[]
}