import Polyglot from "node-polyglot";
import en from "./en";
import de from "./de";

const getLocale = () => navigator.language.slice(0, 2);

const getPhrases = (locale) => {
  let phrases;

  switch (locale) {
    case "de":
      phrases = de;
      break;
    default:
      phrases = en;
  }
  return phrases;
};

const createDefaultPolyglot = () => {
  const locale = getLocale();
  const phrases = getPhrases(locale);
  return new Polyglot({ phrases, locale });
};

const updateLocale = (myPolyglot, newLocale = "") => {
  const locale = newLocale !== "" ? newLocale : getLocale();
  const phrases = getPhrases(locale);
  myPolyglot.extend(phrases);
  myPolyglot.locale(locale);
};

const polyglot = createDefaultPolyglot();

export { polyglot, updateLocale };
