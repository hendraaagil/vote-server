const { Router } = require('express');
const candidateController = require('../controllers/candidateController');

const router = Router();

router.post('/create-candidate', candidateController.create);
router.get('/candidate', candidateController.getCandidate);

module.exports = router;
