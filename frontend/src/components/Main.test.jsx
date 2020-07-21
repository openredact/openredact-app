import React from "react";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitForElement,
} from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import Main from "./Main";
import { anonymizePiis, computeScores, findPiis } from "../api/routes";

jest.mock("../api/routes");
jest.mock("uuid");

afterEach(() => {
  jest.clearAllMocks();
});

const anonymizationConfig = {
  defaultMechanism: { mechanism: "suppression" },
  mechanismsByTag: {},
};

it("shows an upload button", () => {
  const { getByRole } = render(
    <Main
      tags={["GPE"]}
      activatedRecognizers={[]}
      anonymizationConfig={anonymizationConfig}
    />
  );
  const help = getByRole("button", { name: /browse/i });

  expect(help).toBeInTheDocument();
});

it("loads and displays the file as well as preview of the anonymization", async () => {
  findPiis.mockResolvedValue({
    data: {
      piis: [
        {
          startChar: 8,
          endChar: 15,
          tag: "GPE",
          text: "Germany",
          score: 1.0,
          model: "mock",
          startTok: 2,
          endTok: 3,
        },
      ],
      tokens: [
        { startChar: 0, endChar: 4, text: "Made", hasWs: true },
        { startChar: 5, endChar: 7, text: "in", hasWs: true },
        { startChar: 8, endChar: 15, text: "Germany", hasWs: false },
        { startChar: 15, endChar: 16, text: ".", hasWs: false },
      ],
    },
  });
  anonymizePiis.mockResolvedValue({
    data: { anonymizedPiis: [{ text: "XXX", id: "1" }] },
  });
  computeScores.mockResolvedValue({ data: {} });
  uuidv4.mockReturnValue("1");

  const { getByText } = render(
    <Main
      tags={["GPE"]}
      anonymizationConfig={anonymizationConfig}
      activatedRecognizers={[]}
    />
  );

  // fire a drop event - this will be easier in @testing-library/jest-dom 5.x, see
  // https://testing-library.com/docs/dom-testing-library/api-events#fireeventeventname
  const dropZone = getByText(/\.txt/i);
  const fileDropEvent = createEvent.drop(dropZone);
  Object.defineProperty(fileDropEvent, "dataTransfer", {
    value: {
      files: [
        new File(["Made in Germany."], "example.txt", { type: "image/png" }),
      ],
      types: ["Files"],
    },
  });
  fireEvent(dropZone, fileDropEvent);

  await waitForElement(() => screen.getByRole("button", { name: /download/i }));
  expect(findPiis).toHaveBeenCalledTimes(1);
  expect(anonymizePiis).toHaveBeenCalledTimes(1);
  expect(uuidv4).toHaveBeenCalledTimes(1);
  expect(screen.getAllByText("Germany")).toHaveLength(1);
  expect(screen.getAllByText("Made in XXX.")).toHaveLength(1);
});
