export interface BookEssentials {
    title: string;
    authors: string;
}

export interface Book extends BookEssentials {
    key?: string | null | undefined;
    id?: string | null | undefined;
    date?: string | null | undefined;
    cover?: string | null | undefined;
    ownerId: string | null | undefined;
    ownerName: string;
    borrowerName?: string | null | undefined;
    borrowerId?: string | null | undefined;
}

export interface BookFormFormikValues extends BookEssentials {
    borrowerName?: string | null | undefined,
    borrowerId?: string | null | undefined,
  }

export interface EditedBookData extends BookFormFormikValues {
    id: string
}


export interface User {
    id: string,
    name: string
}

