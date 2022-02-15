export interface Book {
    id?: string | null,
    title: string,
    authors: string,
    date: string,
    cover?: string | null,
    ownerId: string,
    ownerName: string,
    borrower?: string | null
}

export interface User {
    id: string,
    name: string
}
