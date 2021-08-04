import { Recurrence } from '../enums/recurrences';

export interface ISpending {
    value: number,
    date: Date,
    recurring: Recurrence
    name: string
}