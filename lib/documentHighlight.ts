import type * as monaco from 'monaco-types'
import type * as ls from 'vscode-languageserver-protocol'

import { fromDocumentHighlightKind, toDocumentHighlightKind } from './documentHighlightKind.js'
import { fromRange, toRange } from './range.js'

/**
 * Convert a Monaco editor document highlight to an LSP document highlight.
 *
 * @param documentHighlight The Monaco document highlight to convert.
 * @returns The document highlight as an LSP document highlight.
 */
export function fromDocumentHighlight(
  documentHighlight: monaco.languages.DocumentHighlight
): ls.DocumentHighlight {
  const result: ls.DocumentHighlight = {
    range: fromRange(documentHighlight.range)
  }

  if (documentHighlight.kind != null) {
    result.kind = fromDocumentHighlightKind(documentHighlight.kind)
  }

  return result
}

/**
 * Convert an LSP document highlight to a Monaco editor document highlight.
 *
 * @param documentHighlight The LSP document highlight to convert.
 * @returns The document highlight as Monaco editor document highlight.
 */
export function toDocumentHighlight(
  documentHighlight: ls.DocumentHighlight
): monaco.languages.DocumentHighlight {
  const result: monaco.languages.DocumentHighlight = {
    range: toRange(documentHighlight.range)
  }

  if (documentHighlight.kind != null) {
    result.kind = toDocumentHighlightKind(documentHighlight.kind)
  }

  return result
}
