export interface Book {
    id?: string | null,
    title: string,
    author: string,
    description: string,
    cover?: string | null,
    owner: string,
    borrower?: string | null
}
