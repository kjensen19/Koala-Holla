const express = require('express');
const koalaRouter = express.Router();


// DB CONNECTION
const db = require('../modules/pool');


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = `
    SELECT * FROM "koalas";
    `;
    db.query(queryText).then(result =>{
        //sends back the results in an object
        res.send(result.rows)
    })
    .catch(error =>{
        console.log('error getting Koalas', error);
        res.sendStatus(500);
    })
})

// POST


// PUT


// DELETE

module.exports = koalaRouter;