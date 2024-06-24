const express =require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./db');
require('dotenv').config();

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const PORT = process.env.PORT || 7000;

//Routes
const authRoute = require('./route/authRoute');
const postRoute = require('./route/postRoute');

app.use(cookieParser(process.env.REF_TOKEN_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/v1/auth', authRoute);
app.use('/v1/post', postRoute);


app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(PORT, () => {
        console.log(`server is listening on port http://localhost:${PORT}`);
      });
    } catch (err) {
      throw err;
    }
  };
  
  start();


