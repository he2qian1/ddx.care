import { isRetriableError } from "../../utils/errors";

/**
 * Discriminated union type for tool return values.
 * Tools return { ok: true, data } on success or { ok: false, error, retriable } on failure.
 * This lets agents reason about why data is missing instead of getting empty results.
 *
 * The `noResults` variant covers legitimate "no matches" outcomes — the API call
 * succeeded (HTTP 200, no transport/parse error) but returned no records. These
 * are NOT failures: the tool did its job, there was just nothing to report.
 * Returning `ok: true` with `noResults: true` ensures the UI classifies these
 * as successes (green) rather than failures (red), while the `message` field
 * lets the agent understand why data is missing.
 */
export type ToolResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; retriable: boolean };

/**
 * Classify a caught error for a ToolResult failure: the error message plus
 * whether retrying might succeed, per the shared `isRetriableError` rules.
 */
export function toErrorResult(error: unknown): {
  error: string;
  retriable: boolean;
} {
  return {
    error: error instanceof Error ? error.message : String(error),
    retriable: isRetriableError(error),
  };
}
