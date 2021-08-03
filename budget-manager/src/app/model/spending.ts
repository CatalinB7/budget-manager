import { Recurrence } from '../enums/recurrences';

export interface ISpending {
    value: number,
    date: Date,
    recurrence: Recurrence
    name: string
}