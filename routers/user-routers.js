const router = require('express').Router();
const userController = require('../controllers/user-controller');
const authentication = require('../middleware/authentication');

//REGISTER
router.post('/login', userController.userLogin);
//LOGIN
router.post('/register', userController.userRegister);
//VERIFICATION
router.get(
  '/register/verification/:code',
  userController.userVerification
);

router.use(authentication);
//GET USER by ID
router.get('/user/profile/:id', userController.userFindById);
//UPDATE USER PROFILE
router.post('/user/profile', userController.userUpdateProfile);

module.exports = router;
