const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require('dotenv');
const passport = require('passport');

const userAPIRouter = require("./routes/uesr");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const db = require("./models");
const app = express();
const passportConfig = require('./passport');
db.sequelize.sync();

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly:true,
    secure:false,//https =>true
  },
  name:'rnbck'
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);

app.listen(8080, () => {
  console.log(`server is running on localhost:8080`);
});
