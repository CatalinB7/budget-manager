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
                            "id": 4,
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
                            "id": 4,
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
                            "id": 4,
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