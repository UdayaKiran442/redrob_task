import * as path from "path";
import * as fs from "fs";
import { extractTextFromPDFService } from "../services/langchain.service";
import { summariseJDService } from "../services/sarvam.service";
import { SummariseJDServiceError } from "../exceptions/sarvam.exceptions";
import { convertTextToEmbeddingsService } from "../services/python.service";
import { ConvertTextToEmbeddingsServiceError } from "../exceptions/common.exceptions";

export async function convertJDToEmbeddings(file: File) {
	let filePath = "";
	try {
		const fileArrayBuffer = await file.arrayBuffer();
		const fileBuffer = Buffer.from(fileArrayBuffer);
		fs.writeFileSync("file.pdf", fileBuffer);
		filePath = path.resolve("file.pdf");
		const text = await extractTextFromPDFService(filePath);
		// generate summary using the extracted text
		const summary = await summariseJDService(text);
		if (!summary) {
			throw new SummariseJDServiceError("Failed to generate summary for the job description");
		}
		// convert the summary to embeddings
		const { embeddings } = await convertTextToEmbeddingsService(summary);
		console.log(embeddings);
		return embeddings;
	} catch (error) {
		if (error instanceof SummariseJDServiceError || error instanceof ConvertTextToEmbeddingsServiceError) {
			throw error;
		}
	} finally {
		if (fs.existsSync("file.pdf")) {
			fs.unlinkSync("file.pdf");
		}
	}
}
