const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
const connectToMongo = require("./db/db");

const notesRoutes = require("./routes/notes.routes");

connectToMongo();


app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
    res.send("hello world");
})







// Job Corn to generate slots everyday at midnight
// jobCorn.slotSchedulerJob();






module.exports = app;