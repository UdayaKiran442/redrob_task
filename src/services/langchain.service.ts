import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ExtractTextFromPDFServiceError } from "../exceptions/langchain.exceptions";

export async function extractTextFromPDFService(filePath: string){
    try {
        const reader = new PDFLoader(filePath);
        const data = await reader.load();
        return data[0].pageContent;
    } catch (error) {
        throw new ExtractTextFromPDFServiceError("Failed to extract text from PDF", { cause: (error as Error).message });
    }
}