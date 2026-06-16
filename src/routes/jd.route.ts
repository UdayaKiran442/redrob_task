import { Hono } from "hono";
import { summariseJD } from "../controller/jd.controller";

const jdRouter = new Hono();

jdRouter.post("/summarise", async (c) => {
    try {
        const payload = await c.req.formData();
        const file = payload.get("file") as File;
        const summary = await summariseJD(file);
        return c.json({ message: "File received successfully", summary });
    } catch (error) {
        console.error("Error in summariseJD route:", error);
    }
})

export default jdRouter;