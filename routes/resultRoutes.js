const { Router } = require('express');
const resultController = require('../controllers/resultController');

const router = Router();

router.post('/result', resultController.send_result);
router.get('/result', resultController.get_result);

module.exports = router;
