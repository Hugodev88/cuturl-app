const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/shorten', authMiddleware, urlController.shortenUrl);
router.get('/', authMiddleware, urlController.getUrls);
router.get('/analytics/:id', authMiddleware, urlController.getUrlAnalytics);
router.post('/:shortUrl/verify', urlController.verifyPassword);
router.get('/:shortUrl', urlController.redirectUrl);

module.exports = router;
