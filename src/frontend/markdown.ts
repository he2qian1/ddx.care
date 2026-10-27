import createDOMPurify from "dompurify";
import { marked } from "marked";

let purify: ReturnType<typeof createDOMPurify> | undefined;

/** Render markdown text to sanitized HTML, safe for dangerouslySetInnerHTML. */
export function renderMarkdown(text: string): string {
  // Bind lazily on first use: dompurify only attaches `sanitize` when a
  // window exists, and import order does not guarantee one at module load
  // (e.g. the test suite installs its DOM globals after imports evaluate).
  purify ??= createDOMPurify(window);
  return purify.sanitize(marked.parse(text, { async: false }) as string);
}
