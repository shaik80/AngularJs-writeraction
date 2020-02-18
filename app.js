let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let blog = require("./api/blog");
let stock = require("./api/stock");
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// application level middleware

app.use((req, res, next) => {
  console.log("===============Start of log===============");
  console.log("Time of request:", Date.now());
  console.log("HostName:", req.hostname);
  console.log("RequestUrl is:", req.originalUrl);
  console.log("Type of Request:", req.method);
  console.log("RequestIp address is:", req.ip);
  console.log("================End of log================");

  next();
});
// end application level middleware

app.use("/", express.static(__dirname + "/public"));

// include the db config file

require("./utils/dbconfig");

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

app.use("/api/stock", stock);
app.use("/api", blog);
