class Token {
  constructor(startChar, endChar, text, hasWhitespace) {
    this.startChar = startChar;
    this.endChar = endChar;
    this.text = text;
    this.hasWhitespace = hasWhitespace;
  }
}

export default Token;
