const { Router } = require('express');
const resultController = require('../controllers/resultController');

const router = Router();

router.post('/send-result', resultController.send_result);

module.exports = router;
