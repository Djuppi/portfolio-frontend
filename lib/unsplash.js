import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

export const getCollections = async () => {
    
    const collections = await unsplashApi.users.getCollections({
        username: 'djuppi'
    })

    const { id } = collections?.response?.results[0];

    const photos = await unsplashApi.collections.getPhotos({
        collectionId: id
    })

    return photos.response.results.map(photo => photo.urls.thumb);

}