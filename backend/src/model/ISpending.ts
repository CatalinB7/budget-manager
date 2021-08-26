export interface ISpending {
    name: string;
    value: number;
    date: string;
    recurring: string;
};

export function isInstanceOfISpending(obj : any): obj is ISpending {
    return obj && typeof obj.name === 'string' && typeof obj.value === 'number' &&
        typeof obj.date === 'string' && typeof obj.recurring === 'string'; 
}

export function isInstanceOfISpendingArray(obj: any): boolean {
    if(!Array.isArray(obj))
        return false;
    for(const el of obj) {
        if(!isInstanceOfISpending(el))
            return false;
    }
    return true;
}