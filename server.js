const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const routes = require("./routes");
// const sqlmodels = require('./sqlmodels');
const Sequelize = require('sequelize');

const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config(); 

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// Add routes, both API and view


// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// Serve up static assets (usually on heroku)
//app.use(express.static("client/build"));
//app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Declare Mongoose Connection Parameters

// "mongodb://heroku_cwf2cqkx:8vpi8pekalrvhlae96mahc4ktq@ds153494.mlab.com:53494/heroku_cwf2cqkx"

//  'mongodb://localhost/hangman_options' ||

let mongoConnect = 'mongodb://localhost/react-template-with-auth'
// Connect to the Mongo DB
mongoose.connect(
  mongoConnect, {
    useMongoClient: true
  }
);

const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log(`Mongoose connection to ${mongoConnect} successful.`);
});


// SQL DB Connection
estSQLCon = (env) => {
  if (env === 'development') {
    console.log(`***DEV ENV DETECTED***`)
    let local_sequelize = new Sequelize(process.env.JAWSDB_URL, {
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    });
  
    return local_sequelize
  } else {
    console.log(`***PROD ENV DETECTED***`)
    let prod_sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
      dialect: 'mysql',
      host: process.env.DB_HOST
    })
    return prod_sequelize 
  }
}
console.log(process.env.NODE_ENV)
console.log(process.env.NODE_ENV==='development') 
console.log(typeof process.env.NODE_ENV)
//const sequelize = estSQLCon(process.env.NODE_ENV)

const sequelize = new Sequelize(process.env.JAWSDB_URL, {dialect:'mysql'})

let proEnv = process.env;
//console.log(`!*!*!*!**!*!*!*!*!*!*!*!*!${sequelize}`)
//console.log(sequelize) 
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

  // var sequelize = new Sequelize(process.env.JAWSDB_URL, {
  //   dialect: 'mysql'
  // })
  



// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
