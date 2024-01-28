type imageAddress = {
    thumbnail: string
}

export type TListPrice = {
    amount: number
}

type TSaleInfo = {
    listPrice: TListPrice,
}

type bookData = {
    imageLinks: imageAddress,
    authors: string[],
    title: string,
    averageRating: number,
    ratingsCount: number,
    description: string,
}


export interface Book {
    id: number,
    volumeInfo: bookData,
    saleInfo: TSaleInfo
}

type TMaxResults = {
    maxResults: number,
}

type TBookCategory = {
    category: string
} & TMaxResults