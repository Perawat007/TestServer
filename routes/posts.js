const express = require('express');
const router = express.Router();
const post = require('../middleware/post');
const auth = require('../middleware/auth');
const getCommission = require('../controllers/getcommission');
const postsController = require('../controllers/posts');

router.post('/token',post);
router.get('/test',postsController.getOne);
router.get('/game', auth, postsController.getGame)
router.post('/convertToken', postsController.convertToken)
router.post('/convertData', postsController.convertData)
router.post('/logAgentMember/:agentId', postsController.logAgentMember)
router.put('/logoutMember/',postsController.logoutMember);
router.get('/commissionGame', getCommission.getCommission)
module.exports = router;
