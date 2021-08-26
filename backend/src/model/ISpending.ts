export interface ISpending {
    name: string;
    value: number;
    date: string;
    recurring: string;
};

export function isTypeOfISpending(obj : any): obj is ISpending {
    return obj && typeof obj.name === 'string' && typeof obj.value === 'number' &&
        typeof obj.date === 'string' && typeof obj.recurring === 'string'; 
}

export function isTypeOfISpendingArray(obj: any): boolean {
    if(!Array.isArray(obj))
        return false;
    for(const el of obj) {
        if(!isTypeOfISpending(el))
            return false;
    }
    return true;
}