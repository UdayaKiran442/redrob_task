import { SarvamAIClient } from "sarvamai";
import { SummariseJDServiceError } from "../exceptions/sarvam.exceptions";

const client = new SarvamAIClient({
	apiSubscriptionKey: process.env.SARVAM_API_KEY || "",
});

export async function summariseJDService(text: string) {
	try {
		const response = await client.chat.completions({
			model: "sarvam-30b",
			messages: [
				{
					role: "system",
					content: `You are a helpful assistant that summarises job descriptions. \n
                    Please provide a concise summary of the following job description: ${text} \n
                    Important points: 
                    1. Focus on the key responsibilities and requirements for the role. \n
                    2. Extract key skills and qualifications needed for the job. \n
                    3. If there are any explicit requirements which mentions unfit for the role, please mention that as well. \n
                    4. Keep the summary concise and to the point, ideally within 3-4 sentences without leaving any important information. \n`,
				},
			],
		});
		return response.choices[0].message.content
			?.replace(/```json/, "")
			.replace(/```/g, "")
			.trim();
	} catch (error) {
		throw new SummariseJDServiceError("Failed to summarise job description", { cause: (error as Error).message });
	}
}
