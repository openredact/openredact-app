import { useContext, useEffect, useState } from "react";
import PolyglotContext from "./polyglotContext";
import { compileFile } from "../api/routes";
import AppToaster from "./toaster";

function useCompile({
  anonymizations,
  fileFormData,
  compileTimer,
  compileDate,
  isCompilable,
}) {
  const t = useContext(PolyglotContext);

  const [base64pdf, setBase64pdf] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    console.log("anonymizations changed...: ", JSON.stringify(anonymizations));
    if (isCompilable) {
      console.log("compiling... ");

      // unset myTimeout
      clearTimeout(compileTimer);
      setIsCompiling(true);

      if (fileFormData && fileFormData.current && anonymizations.length > 0) {
        const formData = fileFormData.current;
        formData.set("anonymizations", JSON.stringify(anonymizations));
        // formData.anonymizations = JSON.stringify(anonymizations);

        compileFile(formData)
          .then((response) => {
            setBase64pdf(response.data.base64);
            setIsCompiling(false);
          })
          .catch(() => {
            AppToaster.show({
              message: t("main.compile_anonymize_file_failed_toast"),
              intent: "danger",
            });
            setIsCompiling(false);
          });
      } else {
        console.log("Do not compile (no form data)");
        setIsCompiling(false);
      }
    } else {
      console.log("file type is not compilable");
    }
  }, [
    t,
    anonymizations,
    fileFormData,
    compileTimer,
    compileDate,
    isCompilable,
  ]);

  return { isCompiling, base64pdf };
}

export default useCompile;
