import * as path from 'path';
import * as fs from 'fs';
import { extractTextFromPDFService } from '../services/langchain.service';
import { summariseJDService } from '../services/sarvam.service';

export async function summariseJD(file: File) {
    let filePath = ''
    try {
        const fileArrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileArrayBuffer);
        fs.writeFileSync('file.pdf', fileBuffer);
        filePath = path.resolve('file.pdf');
        const text = await extractTextFromPDFService(filePath);
        // generate summary using the extracted text
        const summary = await summariseJDService(text);
        return summary;
    } catch (error) {
        console.error("Error processing file:", error);
    }
    finally {
        if (fs.existsSync('file.pdf')) {
            fs.unlinkSync('file.pdf');
        }
    }
}