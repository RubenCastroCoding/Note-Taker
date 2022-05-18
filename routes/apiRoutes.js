const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.json('get!');
});

router.post('/notes', (req, res) => {
    res.json('post!');
});

module.exports = router;
