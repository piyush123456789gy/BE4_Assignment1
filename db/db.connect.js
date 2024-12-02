const mongoose = require("mongoose");
require("dotenv").config()

const mongoUri = process.env.EHEH;
console.log(process.env)
console.log(mongoUri)
console.log(mongoUri)



const initialiseDatabse = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => console.log("Error connecting to Database", error));
};

module.exports = { initialiseDatabse };
