require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

app.use(cors());
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Successfully connected to database"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(logger("combined"));

app.use(mongoSanitize());

// Giving Access TO All Origins ( temporary)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

require("./routes/index")(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started Successfully");
  console.log(
    "Attempting to connect to database, please wait before testing Application..."
  );
});
