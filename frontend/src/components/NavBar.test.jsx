import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import Settings from "./Settings";
import About from "./About";
import Help from "./Help";

it("renders buttons", () => {
  const { getByTitle } = render(
    <NavBar
      settings={
        <Settings
          setActivatedRecognizers={() => {}}
          availableRecognizers={[]}
          activatedRecognizers={[]}
        />
      }
      about={<About />}
      help={<Help />}
    />
  );
  const settings = getByTitle(/settings/i);
  expect(settings).toBeInTheDocument();
  const about = getByTitle(/about/i);
  expect(about).toBeInTheDocument();
  const help = getByTitle(/help/i);
  expect(help).toBeInTheDocument();
});
