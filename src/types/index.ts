export interface Album {
    userId: number;
    id: number;
    title: string;
    photos?: Array<Photo>;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url?: string;
    thumbnailUrl?: string;
}

export interface HistoryRow {
    date: Date;
    itemId: number;
    title: string;
    from: Column;
    to: Column;
}

export enum Column {
    first = "FIRST",
    second = "SECOND"
}