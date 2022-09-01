import type * as monaco from 'monaco-editor'
import type * as ls from 'vscode-languageserver-types'

import { fromRange, toRange } from './range.js'

/**
 * Convert a Monaco editor single edit operation to an LSP text edit.
 *
 * @param editOperation The Monaco single edit operation to convert.
 * @param singleEditOperation
 * @returns The single edit operation as an LSP text edit.
 */
export function fromSingleEditOperation(
  singleEditOperation: monaco.editor.ISingleEditOperation
): ls.TextEdit {
  return {
    newText: singleEditOperation.text ?? '',
    range: fromRange(singleEditOperation.range)
  }
}

/**
 * Convert an LSP text edit to a Monaco editor single edit operation.
 *
 * @param textEdit The LSP text edit to convert.
 * @returns The text edit as Monaco editor single edit operation.
 */
export function toSingleEditOperation(textEdit: ls.TextEdit): monaco.editor.ISingleEditOperation {
  return {
    range: toRange(textEdit.range),
    text: textEdit.newText
  }
}
