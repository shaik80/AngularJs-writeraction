// calling mongoose module
let mongoose = require("mongoose");

//lets define configuration of database

var dbPath = "mongodb://localhost/myblogapp";

// command to connect with database
db = mongoose.connect(dbPath, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
// connect to database and execute the function
mongoose.connection.once("open", function() {
  console.log("database connection open success");
});
