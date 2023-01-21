interface Subcategory {
    id: string,
    name: string,
    cost: number
}

interface Category {
    id: string,
    name: string,
    cost: number,
    subcategories: Subcategory[]
}

interface Budget {
    id: string,
    name: string,
    cost: number,
    peopleCount: number,
    mainBudget: boolean,
    categories: Category[]
}

export interface Integration {
    id: string,
    name: string,
    imgUrl: string,
    budgets: Budget[]
}