import * as fs from "fs";
import type { ICandidate } from "../types/types";
import { convertCandidateToProfileText } from "../utils/utils";
import { convertTextToEmbeddingsService } from "../services/python.service";
import { upsertEmbeddingsService } from "../services/pinecone.service";

export async function upsertCandidatesToEmbeddingsScript() {
	const file = fs.readFileSync("/Users/uday/Desktop/redrob_task/src/data/candidates.jsonl", "utf-8");
	const candidates = file
		.split("\n")
		.filter((line) => line.trim() !== "")
		.map((line) => JSON.parse(line)) as ICandidate[];
	// Here you would typically process the candidates and upsert them to your embeddings store.
	for (const candidate of candidates) {
		// convert candidate to profile text
		const profileText = convertCandidateToProfileText(candidate);
		// convert to embeddings
		const { embeddings } = await convertTextToEmbeddingsService(profileText);
		await upsertEmbeddingsService({
			vectors: embeddings,
			index: "redrobai-task",
			metadata: {
				candidate_profile: profileText,
			},
		});
	}
}
