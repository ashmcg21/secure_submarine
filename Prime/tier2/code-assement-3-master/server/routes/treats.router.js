const express = require('express');
const treatsRouter = require('express').Router();
const pool = require('../modules/pool');


// GET /treats

treatsRouter.get('/', (req, res) => {
    console.log('In /treats GET');
    const queryText = `SELECT * FROM "treats";`;

    pool.query(queryText)
      .then((dbResponse) => {
        const treatsList = dbResponse.rows;
        res.send(treatsList);
      })
      .catch((err) => {
        console.log('GET Error:', err);
        res.sendStatus(500);
      });

});


// POST /treats

treatsRouter.post('/treats', (req, res) => {
    console.log('In /treats POST');

    const newTreat = req.body;
    const queryText = `INSERT INTO "treats" ("name", "description", "pic")
    VALUES ($1, $2, $3);`;

    pool.query(queryText, [
        false,
        newTreat.description
      ])
        .then((dbResponse) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('POST Error:', err);
          res.sendStatus(500);
        });

});

// PUT /treats/<id>

treatsRouter.put('/:id', (req, res) => {
    console.log('In /treats PUT');
    const treatsID = req.params.id;
    const queryText = `UPDATE "treats" SET "name" = $1 WHERE "id" = $2;`

    pool.query(queryText, [
        req.body.complete,
        treatsID
      ])
      .then((dbResponse) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('PUT Error:', err);
        res.sendStatus(500);
      });
});

// DELETE /treats/<id>

treatsRouter.delete('/:id', (req, res) => {
    const treatsId = req.params.id;
    const queryText = `DELETE FROM "treats" WHERE "id" = $1;`;
  
    pool.query(queryText, [
      treatsID
    ])
      .then((dbResponse) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('PUT Error:', err);
        res.sendStatus(500);
      });
  });

module.exports = treatsRouter;
