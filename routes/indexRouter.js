import { Router } from "express";
import indexController from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.get("/", indexController.getProgrammers);

export default indexRouter;