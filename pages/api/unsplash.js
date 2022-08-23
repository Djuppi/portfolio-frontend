import { createApi } from 'unsplash-js';

async function connect(req, res) {
    if(req.method === 'GET') {

        const unsplashRes = createApi({
            accessKey: process.env.UNSPLASH_ACCESS_KEY
        })

        return unsplashRes.users.getCollections({
            username: 'djuppi'
        })

    }
}

export default connect;

