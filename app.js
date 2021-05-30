const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// config読み込み
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ヘルパーの呼び出し
const { formatDate } = require("./helpers/hbs");

// setting Handlebars
app.engine(
  ".hbs",
  exphbs({ helpers: { formatDate }, defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", ".hbs");

// static folder
app.use(express.static(path.join(__dirname, "public")));

// sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/weights", require("./routes/weights"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
