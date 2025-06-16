import express from 'express';
import path from 'node:path';
import indexRouter from './routes/indexRouter.js';
import contributionRouter from './routes/contributionRouter.js';
import maxRatingRouter from './routes/maxRatingRouter.js';
const app = express();

app.use("/", indexRouter);
app.use("/contribution", contributionRouter);
app.use("/maxRating", maxRatingRouter);

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
