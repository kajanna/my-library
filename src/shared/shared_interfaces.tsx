export interface Book {
    key?: string | null
    id: string,
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

export interface BookFormFormikValues {
    title: string,
    authors: string,
    borrower?: string |null
  }

export interface editedBookData {
    title: string;
    authors: string;
    borrower: string | null | undefined
    date: string;
    id: string
}

export interface newBookData {
    title: string,
    authors: string,
    ownerId: string,
    ownerName: string,
    borrower?: string | null,
    date: string;
}
