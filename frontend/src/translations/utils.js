import Polyglot from "node-polyglot";
import en from "./en";
import de from "./de";

const createPolyglotForNavigatorLanguage = () => {
  let phrases = en;
  const locale = navigator.language.slice(0, 2);

  switch (locale) {
    case "de":
      phrases = de;
      break;
    default:
  }
  return new Polyglot({ phrases, locale });
};

export default createPolyglotForNavigatorLanguage;
