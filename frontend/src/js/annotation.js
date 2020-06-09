import { v4 as uuidv4 } from "uuid";

class Annotation {
  constructor(start, end, tag, text) {
    this.start = start;
    this.end = end;
    this.text = text;
    this.tag = tag;
    this.id = uuidv4();
  }
}

export default Annotation;
