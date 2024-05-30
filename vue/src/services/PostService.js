import Api from './Api'

const signInWithFacebook = async () => {
    return Api().post('/signInWithFacebook')
}

const getPages = async (accessToken) => {
    try{
        const response = await Api().get('/getPages', {
            params: {
              accessToken
            }
          });
        return response
    }catch (error) {
        throw error;
    }
}

const getFeed = async (accessToken) => {
    try{
        const response = await Api().get('/getFeed', {
            params: {
              accessToken
            }
          });
        return response.data
    }catch (error) {
        throw error;
    }
}

const getLatestFeed = async (accessToken) => {
    try{
        const response = await Api().get('/getLatestPost', {
            params: {
              accessToken
            }
          });
        return response.data
    }catch (error) {
        throw error;
    }
}

const getPageEngagements = async (pageId, accessToken) => {
    try{
        const response = await Api().get('/getPageEngagements', {
            params: {
              accessToken,
              pageId
            }
          });
        return response.data
    }catch (error) {
        throw error;
    }
}

const deletePost = async (postId, accessToken) => {
    try{
        const response = await Api().delete('/deletePost', {
            params: {
                postId,
                accessToken
            }
          });
        return response
    }catch (error) {
        throw error;
    }
}

const getEngagements = async (accessToken) => {
    try{
        const response = await Api().get('/getEngagements', {
            params: {
              accessToken
            }
          });
        return response.data
    }catch (error) {
        throw error;
    }
}

const generateReport = async (accessToken) => {
    try{
        const response = await Api().get('/generateReport', {
            params: {
              accessToken
            }
          });
        return response.data
    }catch (error) {
        throw error;
    }
}

const getLatestPost = async (id, accesstoken) => {
    try {
        const response = await Api().get('/latestPost', { 
            params: {
              id,
              accesstoken,
            },
          }); 
        return response.data;
    } catch (error) {
        throw error;
    }
}

const createPostTimer = async (message, id, accesstoken) => {
    try {
        const response = await Api().post('/createPostTimer', { message, id, accesstoken }); 
        return response;
    } catch (error) {
        throw error;
    }
}
const createPost = async (message, id, accesstoken) => {
    try {
        const response = await Api().post('/createPost', { message, id, accesstoken }); 
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    signInWithFacebook,
    getLatestPost,
    createPost,
    createPostTimer,
    getPages,
    getFeed,
    getLatestFeed,
    getPageEngagements,
    deletePost,
    getEngagements,
    generateReport
}


