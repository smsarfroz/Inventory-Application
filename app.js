import express from 'express';
import path from 'node:path';
const app = express();

app.get("/", (req, res) => res.render("competitiveProgrammers"));
app.get("/contribution", (req, res) => res.send("contribution page"));
app.get("/maxRating", (req, res) => res.send("max rating page"));

const currentDir = import.meta.dirname;
const assetsPath = path.join(currentDir, "public");

app.use(express.static(assetsPath));
app.set("views", path.join(currentDir, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
