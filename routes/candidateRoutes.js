const { Router } = require('express');
const candidateController = require('../controllers/candidateController');

const router = Router();

router.post('/create-candidate', candidateController.create);
router.get('/candidates', candidateController.getCandidate);
router.get('/candidates/:candidateId', candidateController.getCandidateById);

module.exports = router;
