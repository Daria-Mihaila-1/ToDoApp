//used for Rest APIs 
const Express = require("express");
//for enabling CORS on websites
const cors = require("cors");

const app = Express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(Express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(Express.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Hi there, you are not supposed to be here, aren't you?" });
// });



// set port, listen for requests
const PORT = process.env.PORT || 5038;

//routing applied to application
require("./app/routes/task.routes")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./app/models");
db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(()=>{
    console.log("Connected to MongoDB database successfully!")
    })
    .catch (err=> {
        console.log(err);
        process.exit();
    })
    

