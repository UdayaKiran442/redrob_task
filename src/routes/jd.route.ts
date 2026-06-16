import { Hono } from "hono";
import { convertJDToEmbeddings } from "../controller/jd.controller";
import { SummariseJDServiceError } from "../exceptions/sarvam.exceptions";
import { ConvertTextToEmbeddingsServiceError } from "../exceptions/common.exceptions";

const jdRouter = new Hono();

jdRouter.post("/convert-embeddings", async (c) => {
	try {
		const payload = await c.req.formData();
		const file = payload.get("file") as File;
		const embeddings = await convertJDToEmbeddings(file);
		return c.json({ success: true, message: "File received successfully", embeddings });
	} catch (error) {
		if (error instanceof SummariseJDServiceError || error instanceof ConvertTextToEmbeddingsServiceError) {
			return c.json({ success: false, error: error.message, cause: error.cause }, 500);
		}
	}
});

export default jdRouter;
