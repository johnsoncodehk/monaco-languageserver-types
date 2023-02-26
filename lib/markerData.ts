import type * as monaco from 'monaco-editor'
import type * as ls from 'vscode-languageserver-types'

import { fromMarkerSeverity, toMarkerSeverity } from './markerSeverity.js'
import { fromMarkerTag, toMarkerTag } from './markerTag.js'
import { fromRange, toRange } from './range.js'
import { fromRelatedInformation, toRelatedInformation } from './relatedInformation.js'

/**
 * Convert a Monaco editor marker data to an LSP diagnostic.
 *
 * @param markerData The Monaco marker data to convert.
 * @returns The marker data as an LSP diagnostic.
 */
export function fromMarkerData(markerData: monaco.editor.IMarkerData): ls.Diagnostic {
  const diagnostic: ls.Diagnostic = {
    code: String(markerData.code),
    message: markerData.message,
    range: fromRange(markerData),
    severity: fromMarkerSeverity(markerData.severity),
    source: markerData.source,
    tags: markerData.tags?.map(fromMarkerTag),
    relatedInformation: markerData.relatedInformation?.map(fromRelatedInformation)
  }

  if (markerData.code == null) {
    diagnostic.code = undefined
    diagnostic.codeDescription = undefined
  } else if (typeof markerData.code === 'string') {
    diagnostic.code = markerData.code
    diagnostic.codeDescription = undefined
  } else {
    diagnostic.code = markerData.code.value
    diagnostic.codeDescription = { href: String(markerData.code.target) }
  }

  return diagnostic
}

/**
 * Convert an LSP diagnostic to a Monaco editor marker data.
 *
 * **Note**: A default severity of {@link monaco.MarkerSeverity.Error} is used.
 *
 * @param diagnostic The LSP diagnostic to convert.
 * @param Uri The Monaco Uri constructor.
 * @returns The diagnostic as Monaco editor marker data.
 */
export function toMarkerData(
  diagnostic: ls.Diagnostic,
  Uri: typeof monaco.Uri
): monaco.editor.IMarkerData {
  return {
    ...toRange(diagnostic.range),
    code:
      diagnostic.code == null
        ? undefined
        : diagnostic.codeDescription
        ? { value: String(diagnostic.code), target: Uri.parse(diagnostic.codeDescription.href) }
        : String(diagnostic.code),
    message: diagnostic.message,
    relatedInformation: diagnostic.relatedInformation?.map((relatedInformation) =>
      toRelatedInformation(relatedInformation, Uri)
    ),
    severity: diagnostic.severity ? toMarkerSeverity(diagnostic.severity) : 8,
    source: diagnostic.source,
    tags: diagnostic.tags?.map(toMarkerTag)
  }
}