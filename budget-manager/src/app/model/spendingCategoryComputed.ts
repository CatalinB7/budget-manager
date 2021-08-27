import { ISpending } from './spending';

export interface IComputedSpendCategory {
    name: string;
    total: number;
    expenses: ISpending[]
}