const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
    //        index.pug
    res.render('index', {
        title: 'My express app',
        message: 'Hello World' 
    });
});

module.exports = router;