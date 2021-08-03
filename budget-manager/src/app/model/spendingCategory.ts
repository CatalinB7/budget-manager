import { ISpending } from './spending';

export interface ISpendingCategory {
    name: string
    spending: ISpending[],
}