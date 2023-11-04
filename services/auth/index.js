//* npm install express
const express = require('express');
const auth = require("./handlers/authHandler");
const db = require("../../pkg/db/index");

const app = express();

db.init();
app.use(express.json());

// ruti

app.listen(process.env.PORTAUTH, (err) => {
    if (err) {
      console.log('Could not start service');
    }
    console.log(`service started successfully on port ${process.env.PORTAUTH}`);
  });