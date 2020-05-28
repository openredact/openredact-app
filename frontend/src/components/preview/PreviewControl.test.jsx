import React from "react";
import { render } from "@testing-library/react";
import PreviewControl from "./PreviewControl";
import Token from "../../js/token";
import Anonymization from "../../js/anonymization";

it("renders text preview", () => {
  const tokens = [
    new Token(0, 2, "My", true),
    new Token(3, 7, "name", true),
    new Token(8, 10, "is", true),
    new Token(11, 15, "Khan", false),
    new Token(15, 16, ".", false),
  ];
  const anonymizations = [new Anonymization(3, 4, 11, 15, "XXXX")];
  const anonymizedText = "My name is XXXX.";
  const { getByText } = render(
    <PreviewControl
      anonymizations={anonymizations}
      onDownload={() => false}
      tokens={tokens}
    />
  );
  const element = getByText(anonymizedText);
  expect(element).toBeInTheDocument();
});
