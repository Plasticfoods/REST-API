const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1>REST_API</h1>`);
});

module.exports = router;