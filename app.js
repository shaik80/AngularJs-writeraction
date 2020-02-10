let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
// calling mongoose module
let mongoose = require("mongoose");

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

// include the db config file

require("./utils/dbconfig");

// include the model file

let Blog = require("./models/blogModel.js");

let blogModel = mongoose.model("Blog");
// now we can perform various functions on the database using this

//end include

//here are the routes
app.get("/", (req, res) => {
  res.send("This is a blog application");
});

//////////////Start of users blog REST api//////////////////

// start route to get all blogs
app.get("/blogs", (req, res) => {
  blogModel.find((err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  }); //end user model find
});

//end route to get all blogs

//route to get a particular blog
app.get("/blogs/:id", (req, res) => {
  blogModel.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log("some error");
      res.send(err);
    } else {
      /*console.log("123"+result)*/
      res.send(result);
    }
  }); // end user model findOne
});

// end route to get a particular blog

// start route to create a blog

app.post("/blogs/create", (req, res) => {
  let newBlog = new blogModel({
    title: req.body.title,
    subTitle: req.body.subTitle,
    blogBody: req.body.blogBody
  }); //end new blog

  //lets set the date of creation
  let today = Date.now();
  newBlog.created = today;

  //lets set the tags into an array
  let allTags =
    req.body.allTags != undefined && req.body.allTags != null
      ? req.body.allTags.split(",")
      : "";
  newBlog.tags = allTags;

  //lets set the author information
  let authorInfo = {
    fullName: req.body.authorFullName,
    email: req.body.authorEmail
  };
  newBlog.authorInfo = authorInfo;

  //now lets save the file
  newBlog.save(error => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(newBlog);
    }
  });
});

// end route to create a blog

// start route to edit a bog using _id

app.put("/blogs/:id/edit", (req, res) => {
  let update = req.body;

  blogModel.findOneAndUpdate({ _id: req.params.id }, update, (err, result) => {
    if (err) {
      console.log("some error");
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  }); //end user model find
});
// end route to edit a blog using _id

// start the route to delete a blog
app.post("/blogs/:id/delete", (req, res) => {
  blogModel.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log("some error");
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//end delete

app.get("*", (request, response, next) => {
  response.status = 404;
  next("Path not found");
});

/////////////////////////end users api////////////////////////////

// error handling middleware

app.use((err, req, res, next) => {
  console.log("Error handler was used");
  /*res.status(500).send('Something broke!');*/
  if (res.status == 404) {
    res.send(
      "Seems like you reached a wrong page. Please check the url again."
    );
  } else {
    res.send(err);
  }
});

// end error handling middleware

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
