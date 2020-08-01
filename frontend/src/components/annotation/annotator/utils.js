import sortBy from "lodash.sortby";

export const splitWithOffsets = (text, offsets) => {
  let lastEnd = 0;
  const splits = [];

  for (const offset of sortBy(offsets, (o) => o.start)) {
    const { start, end } = offset;

    if (lastEnd < start) {
      splits.push({
        start: lastEnd,
        end: start,
        text: text.slice(lastEnd, start),
      });
    }
    splits.push({
      ...offset,
      mark: true,
      text: text.slice(start, end),
    });
    lastEnd = end;
  }
  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      text: text.slice(lastEnd, text.length),
    });
  }

  return splits;
};

// offsets:  {start: number; end: number}[]
export const splitTokensWithOffsets = (tokens, offsets) => {
  let lastEnd = 0;
  const splits = [];

  for (const offset of sortBy(offsets, (o) => o.start)) {
    const { start, end } = offset;
    if (lastEnd < start) {
      for (let i = lastEnd; i < start; i += 1) {
        splits.push({
          i,
          text: tokens[i].text,
          hasWhitespace: tokens[i].hasWhitespace,
          linebreakCount: tokens[i].linebreakCount,
        });
      }
    }
    splits.push({
      ...offset,
      mark: true,
      text: tokens
        .slice(start, end)
        .map((t) => t.text)
        .join(" "),
      hasWhitespace: tokens[end - 1].hasWhitespace,
      linebreakCount: tokens[end - 1].linebreakCount,
    });
    lastEnd = end;
  }

  for (let i = lastEnd; i < tokens.length; i += 1) {
    splits.push({
      i,
      text: tokens[i].text,
      hasWhitespace: tokens[i].hasWhitespace,
      linebreakCount: tokens[i].linebreakCount,
    });
  }

  return splits;
};

// selection: Selection
export const selectionIsEmpty = (selection) => {
  if (selection.anchorNode) {
    const position = selection.anchorNode.compareDocumentPosition(
      selection.focusNode
    );

    return position === 0 && selection.focusOffset === selection.anchorOffset;
  }
  return true;
};

// selection: Selection
export const selectionIsBackwards = (selection) => {
  if (selectionIsEmpty(selection)) return false;

  const position = selection.anchorNode.compareDocumentPosition(
    selection.focusNode
  );

  let backward = false;
  if (
    (!position && selection.anchorOffset > selection.focusOffset) ||
    position === Node.DOCUMENT_POSITION_PRECEDING
  )
    backward = true;

  return backward;
};
