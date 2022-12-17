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
            // send back array of task objects if successful
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            console.log('Error getting "tasks"!', dbErr);
            res.sendStatus(500);
        })
})


// POST(create) /tasks
tasksRouter.post('/', (req, res) => {
    console.log('POST tasksRouter');
    console.log(req.body);
    // set req.body as a more understandable variable
    let newTask = req.body;
    console.log('adding task:', newTask);

    let sqlQuery = `
    INSERT INTO "tasks" ("task", "completed")
    VALUES ($1, $2);
    `
    // objects are shipped around in arrays
    let sqlValues = [newTask.task, newTask.completed];
    // use pg to send query and array of objects(data) to database
    pool.query(sqlQuery, sqlValues)
        // send "Created" status if successful
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log('Error adding newTask!', dbErr);
            res.sendStatus(500);
        })
})


// DELETE(delete) /tasks/:id
tasksRouter.delete('/:id', (req, res) => {
    // :id is a paramter added to url address
    // set req.params.id as a more understandable variable
    // req.params is an object {id: 'VALUE'}
    let idToDelete = req.params.id;

    let sqlQuery = `
    DELETE FROM "tasks"
    WHERE "id"=$1;
    `
    // objects are shipped around in arrays
    let sqlValues = [idToDelete];
    // use pg to send query and array of objects(data) to delete
    pool.query(sqlQuery, sqlValues)
        //wait for response from database
        .then((dbRes) => {
            // send status "OK" if successful
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('Error removing task!', dbErr);
            res.sendStatus(500);
        })
})


// PUT

module.exports = tasksRouter;