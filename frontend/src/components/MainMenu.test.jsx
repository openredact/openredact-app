import React from "react";
import { render } from "@testing-library/react";
import MainMenu from "./MainMenu";

it("renders button", () => {
  const { getByRole } = render(
    <MainMenu
      onDownload={() => {}}
      onNewDocument={() => {}}
      showDownloadButton={false}
      onShowScores={() => {}}
    />
  );
  const button = getByRole("button");
  expect(button).toBeInTheDocument();
});
