const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/users/:userId', authController.getUserById);
router.put('/users/:userId', authController.updateUserById);

module.exports = router;
