const express = require('express');
const tasksRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


// GET /tasks
tasksRouter.get('/', (req, res) => {
    console.log('GET tasksRouter');
    let sqlQuery = `
    SELECT * FROM "tasks"
    ORDER BY "id";
    `
    // send query
    pool.query(sqlQuery)
        // wait for response from databse
        .then((dbRes) => {
            // send back array of task objects
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            console.log('error getting "tasks"', dbErr);
            res.sendStatus(500);
        })
})

// POST

// DELETE

// PUT

module.exports = tasksRouter;