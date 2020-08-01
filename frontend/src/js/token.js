class Token {
  constructor(startChar, endChar, text, hasWhitespace, linebreakCount) {
    this.startChar = startChar;
    this.endChar = endChar;
    this.text = text;
    this.hasWhitespace = hasWhitespace;
    this.linebreakCount = linebreakCount;
  }
}

export default Token;
