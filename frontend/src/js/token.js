class Token {
  constructor(startChar, endChar, text, hasWhitespace, hasLinebreak) {
    this.startChar = startChar;
    this.endChar = endChar;
    this.text = text;
    this.hasWhitespace = hasWhitespace;
    this.hasLinebreak = hasLinebreak;
  }
}

export default Token;
