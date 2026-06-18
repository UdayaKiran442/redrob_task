import { Pinecone } from "@pinecone-database/pinecone";
import type { PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { generateNanoId } from "../utils/nano.utils";
import { UpsertEmbeddingsServiceError } from "../exceptions/sarvam.exceptions";

const pc = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY || "",
});

export async function upsertEmbeddingsService(payload: { vectors: number[][]; metadata: unknown; index: string }) {
	try {
		const index = pc.index({ name: payload.index });
		const data_to_upsert: PineconeRecord<RecordMetadata>[] = payload.vectors.map((vector) => ({
			id: generateNanoId(),
			values: vector,
			metadata: payload.metadata as RecordMetadata,
		}));

		await index.upsert({
			records: data_to_upsert,
		});
	} catch (error) {
		throw new UpsertEmbeddingsServiceError("Failed to upsert embeddings", {
			cause: (error as Error).message,
		});
	}
}
