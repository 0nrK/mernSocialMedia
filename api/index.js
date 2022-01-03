const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");
const path = require("path")
const multer = require("multer")

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image")
  },
  filename: (req, file, cb) => {
    cb: (null, req.body.name)
  }
})

const upload = multer({ storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully.")
  } catch (err) {
    console.log(err)
  }
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});