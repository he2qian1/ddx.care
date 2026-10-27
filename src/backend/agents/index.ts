import type { Agent } from "@mastra/core/agent";
import { createSpecialistAgent } from "./factory";
import { specialistManifest, type SpecialistId } from "./manifest";

export {
  specialistCatalog,
  specialistIds,
  specialistManifest,
  specialistMetadataById,
  type SpecialistId,
  type SpecialistMetadata,
} from "./manifest";

/** All specialist agents (excludes the CMO orchestrator) */
export const specialists = Object.fromEntries(
  specialistManifest.map((metadata) => [
    metadata.id,
    createSpecialistAgent({
      id: metadata.id,
      instructions: metadata.instructions,
    }),
  ]),
) as Record<SpecialistId, Agent>;

/** List of agent metadata for the /v1/agents endpoint */
export const agentList = specialistManifest.map(
  ({ id, name, description }) => ({
    id,
    name,
    description,
  }),
);
