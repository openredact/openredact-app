import React from "react";
import { render } from "@testing-library/react";
import ConfigMenu from "./ConfigMenu";

it("renders", () => {
  render(
    <ConfigMenu
      tags={["PER"]}
      config={{
        defaultMechanism: { mechanism: "suppression" },
        mechanismsByTag: {},
      }}
      setConfig={() => {}}
    />
  );
});
