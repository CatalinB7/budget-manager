import { ISpendingCategory } from './spendingCategory';

export interface ISpendingResponseItem {
    categories: ISpendingCategory[];
}

export type SpendingResponse = [ISpendingResponseItem];