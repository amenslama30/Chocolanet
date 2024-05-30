const {Router} = require('express')
const router = Router()
const { getUsers,
        addUser,
        deleteUser,
        updateUser,
        updateProfilePic,
        fetchUser,
        modifUser,
        linkSocialMediaAccount,
    } = require('../controllers/usermanage.js')



// Route for fetching  all users
router.get('/getUsers' , getUsers)
// Route for fetching  all users
router.post('/addUser' , addUser)
// Route for deleting a user
router.delete('/deleteUser/:id' , deleteUser)
// Route for updating a user
router.put('/updateUser/:id', updateUser);
// Route for fetching user data
router.get('/fetchUser' , fetchUser)
// Route for updating user data
router.put('/modifUser' , modifUser)
// Route for updating user's profilePic
router.put('/updateProfilePic' , updateProfilePic)
// Route for linking accounts
router.post('/LinkAcc' , linkSocialMediaAccount)




module.exports = router