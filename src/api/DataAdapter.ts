import { Album, Photo } from '@/types';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const RawToAlbum = (raw: any): Album => {
    return {
        id: raw.id,
        userId: raw.userId,
        title: raw.title,
        photos: []
    }
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const RawToPhoto = (raw: any): Photo => {
    return {
        id: raw.id,
        albumId: raw.albumId,
        title: raw.title,
        url: raw.url,
        thumbnailUrl: raw.thumbnailUrl
    }
}