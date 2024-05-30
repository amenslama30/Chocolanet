import Api from './Api'


const modifUser = async (credentials) => {
    return Api().put('modifUser', credentials)
}

const updateProfilePic = async (profilePic) => {
    console.log(profilePic)
    return Api().put('/updateProfilePic', {profilePic})
}
export { 
    modifUser,
    updateProfilePic
};