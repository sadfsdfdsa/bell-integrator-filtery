
export const getAlbums = async () =>
    fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => response.json())

export const getPhotosByAlbum = async (id: number) =>
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + id)
    .then(response => response.json())