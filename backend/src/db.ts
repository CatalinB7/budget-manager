export class CustomError extends Error {
    #statusCode: number;
    constructor(message: string, httpStatus: number) {
        super(message);
        this.#statusCode = httpStatus;
        Error.captureStackTrace(this, this.constructor);
    }

    get Message() {
        return this.message;
    }

    get StatusCode() {
        return this.#statusCode;
    }
}

export const db = {
    "users": [
        {
            "id": 1,
            "username": "John",
            "password": "12345"
        },
        {
            "id": 2,
            "username": "Bob",
            "password": "12345"
        },
        {
            "id": 3,
            "username": "Ben",
            "password": "12345"
        },
        {
            "id": 4
        },
        {
            "username": "dada",
            "password": "12345",
            "id": 5
        }
    ],
    "budgets": [
        {
            "userId": "1",
            "budget": {
                "value": 40000,
                "plannedSaving": 0.2
            }
        },
        {
            "userId": "2",
            "budget": {
                "value": 50000,
                "plannedSaving": 0.3
            }
        },
        {
            "userId": "3",
            "budget": {
                "value": 45000,
                "plannedSaving": 0.25
            }
        }
    ],
    "expenses_categories": [
        {
            "id": 1,
            "userId": "1",
            "categories": [
                {
                    "name": "electronics",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "ASUS Laptop",
                            "value": 6000,
                            "date": "2021-08-02T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 2,
                            "name": "Jabra Headphones",
                            "value": 1100,
                            "date": "2021-07-20T15:29:56.128Z",
                            "recurring": "yearly"
                        },
                        {
                            "id": 3,
                            "name": "PS4",
                            "value": 1900,
                            "date": "2021-06-22T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 3,
                            "name": "DELL Monitor",
                            "value": 3000,
                            "date": "2021-07-15T15:29:56.128Z",
                            "recurring": "none"
                        }
                    ]
                },
                {
                    "name": "grocery",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "Food",
                            "value": 400,
                            "date": "2021-07-30T15:29:56.128Z",
                            "recurring": "weekly"
                        }
                    ]
                },
                {
                    "name": "hobbies",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "Bike",
                            "value": 3500,
                            "date": "2021-07-25T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 2,
                            "name": "Running shoes",
                            "value": 500,
                            "date": "2021-06-30T15:29:56.128Z",
                            "recurring": "yearly"
                        },
                        {
                            "id": 3,
                            "name": "Climbing shoes",
                            "value": 2000,
                            "date": "2021-05-21T15:29:56.128Z",
                            "recurring": "yearly"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "userId": "2",
            "categories": [
                {
                    "name": "electronics",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "ASUS Laptop",
                            "value": 6000,
                            "date": "2021-08-02T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 2,
                            "name": "Jabra Headphones",
                            "value": 1100,
                            "date": "2021-07-20T15:29:56.128Z",
                            "recurring": "yearly"
                        },
                        {
                            "id": 3,
                            "name": "PS4",
                            "value": 1900,
                            "date": "2021-06-22T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 3,
                            "name": "DELL Monitor",
                            "value": 3000,
                            "date": "2021-07-15T15:29:56.128Z",
                            "recurring": "none"
                        }
                    ]
                },
                {
                    "name": "grocery",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "Food",
                            "value": 400,
                            "date": "2021-07-30T15:29:56.128Z",
                            "recurring": "weekly"
                        }
                    ]
                },
                {
                    "name": "hobbies",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "Bike",
                            "value": 3500,
                            "date": "2021-07-25T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 2,
                            "name": "Running shoes",
                            "value": 500,
                            "date": "2021-06-30T15:29:56.128Z",
                            "recurring": "yearly"
                        },
                        {
                            "id": 3,
                            "name": "Climbing shoes",
                            "value": 2000,
                            "date": "2021-05-21T15:29:56.128Z",
                            "recurring": "yearly"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "userId": "3",
            "categories": [
                {
                    "name": "electronics",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "ASUS Laptop",
                            "value": 6000,
                            "date": "2021-08-02T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 2,
                            "name": "Jabra Headphones",
                            "value": 1100,
                            "date": "2021-07-20T15:29:56.128Z",
                            "recurring": "yearly"
                        },
                        {
                            "id": 3,
                            "name": "PS4",
                            "value": 1900,
                            "date": "2021-06-22T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 3,
                            "name": "DELL Monitor",
                            "value": 3000,
                            "date": "2021-07-15T15:29:56.128Z",
                            "recurring": "none"
                        }
                    ]
                },
                {
                    "name": "grocery",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "Food",
                            "value": 400,
                            "date": "2021-07-30T15:29:56.128Z",
                            "recurring": "weekly"
                        }
                    ]
                },
                {
                    "name": "hobbies",
                    "expenses": [
                        {
                            "id": 1,
                            "name": "Bike",
                            "value": 3500,
                            "date": "2021-07-25T15:29:56.128Z",
                            "recurring": "none"
                        },
                        {
                            "id": 2,
                            "name": "Running shoes",
                            "value": 500,
                            "date": "2021-06-30T15:29:56.128Z",
                            "recurring": "yearly"
                        },
                        {
                            "id": 3,
                            "name": "Climbing shoes",
                            "value": 2000,
                            "date": "2021-05-21T15:29:56.128Z",
                            "recurring": "yearly"
                        }
                    ]
                }
            ]
        }
    ]
}

let checkCategoryExists = (userId: string, newCategory: string) => {
    let userExpenses_categories = db.expenses_categories.filter(el => el.userId == userId)[0];
    for (let el of userExpenses_categories.categories) {
        if (el.name == newCategory)
            return true;
    }
    return false;
}

let insertCategory = (userId: string, newCategory: string, expenses: any) => {//todo create interface for expensees
    console.log("new name ", newCategory);
    let userExpenses_categories = db.expenses_categories.filter(el => el.userId == userId)[0];
    userExpenses_categories.categories.push({ name: newCategory, expenses });
}

let removeCategory = (userId: string, name: string) => {
    let a = db.expenses_categories.filter(el => el.userId == userId)[0];
    a.categories = a.categories.filter(el => el.name != name);
}

let editCategory = (userId: string, oldName: string, newName: string) => {
    let a = db.expenses_categories.filter(el => el.userId == userId)[0];
    a.categories = a.categories.map(el => {
        if(el.name == oldName)
            el.name = newName;
        return el;
    });
}

export { checkCategoryExists, editCategory, insertCategory, removeCategory };