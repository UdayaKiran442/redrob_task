import { Hono } from "hono";
import jdRouter from "./jd.route";

const apiRouter = new Hono();

apiRouter.route('/jd', jdRouter);

export default apiRouter;