const {Router} = require('express')
const router = Router()
const { signin, 
        signup, 
        FBsignin, 
        FBsignup, 
        Xsignin,
        Xsignup,
        recoverPassword,
        resetPassword,
        signout
    } = require('../controllers/usercon.js')



// Route for initiating signin
router.post('/signin' , signin)
// Route for initiating signup
router.post('/signup' , signup)
// Route for initiating facebook signin
router.post('/FBsignin' , FBsignin)
// Route for initiating facebook signup
router.post('/FBsignup' , FBsignup)
// Route for initiating twitter signin
router.post('/Xsignin' , Xsignin)
// Route for initiating twitter signup
router.post('/Xsignup' , Xsignup)
// Route for initiating password recover
router.post('/recover-password' , recoverPassword)
// Route for initiating password recover
router.post('/reset-password' , resetPassword)
// Route for initiating signout
router.get('/signout' , signout)



module.exports = router