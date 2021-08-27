export interface IBudget {
    value: number;
    plannedSaving: number;
}

export function isTypeOfIBudget(obj: any): obj is IBudget {
    return obj && typeof obj.value === 'number' && typeof obj.plannedSaving === 'number';
}