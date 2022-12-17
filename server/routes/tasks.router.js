const express = require('express');
const tasksRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');


// GET(read) /tasks
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


// POST(create) /tasks
tasksRouter.post('/', (req, res) => {
    console.log('POST tasksRouter');
    // set req.body as a more understandable variable
    let newTask = req.body;
    console.log('adding task:', newTask);

    let sqlQuery = `
    INSERT INTO "tasks" ("task", "completed")
    VALUES ($1, $2);
    `
    let sqlValues = [newTask.task, newTask.completed];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('Error adding newTask', dbErr);
        res.sendStatus(500);
    })
})


// DELETE

// PUT

module.exports = tasksRouter;