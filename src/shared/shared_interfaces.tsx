export interface Book {
    id?: string | null,
    title: string,
    author: string,
    date: string,
    cover?: string | null,
    owner: string,
    borrower?: string | null
}
