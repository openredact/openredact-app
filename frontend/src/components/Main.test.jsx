import React from "react";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitForElement,
} from "@testing-library/react";
import Main from "./Main";
import { anonymizeFile, fetchTags, findPiis } from "../api/routes";

jest.mock("../api/routes");

it("shows an upload button", () => {
  // tags are fetched when the component is mounted
  fetchTags.mockResolvedValue({ data: ["STATE"] });

  const { getByRole } = render(<Main />);
  const help = getByRole("button", { name: /browse/i });

  expect(help).toBeInTheDocument();
  expect(fetchTags).toHaveBeenCalledTimes(1);
});

it("loads and displays the file as well as anonymization preview", async () => {
  // mock endpoints
  fetchTags.mockResolvedValue({ data: ["STATE"] });
  findPiis.mockResolvedValue({
    data: {
      tokens: [
        {
          start_char: 8,
          end_char: 15,
          text: "Germany",
          has_ws: true,
        },
      ],
    },
  });
  anonymizeFile.mockResolvedValue({ data: {} }); // TODO

  const { getByText } = render(<Main />);

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
  expect(fetchTags).toHaveBeenCalled();
  expect(findPiis).toHaveBeenCalledTimes(1);
  expect(screen.getAllByText("Germany")).toHaveLength(2);
});
