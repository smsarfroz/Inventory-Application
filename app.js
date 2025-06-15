import express from 'express';
import path from 'node:path';
import indexRouter from './routes/indexRouter.js';
const app = express();

// app.get("/", (req, res) => res.render("competitiveProgrammers"));
app.use("/", indexRouter);
app.get("/contribution", (req, res) => res.render("contribution"));
app.get("/maxRating", (req, res) => res.render("maxRating"));

const currentDir = import.meta.dirname;
const assetsPath = path.join(currentDir, "public");

app.use(express.static(assetsPath));
app.set("views", path.join(currentDir, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express app - listening on port ${PORT}!`);
});
