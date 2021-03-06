/* global test, expect */
import React from "react";
import Enzyme, { render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { HtxHeader } from "../Header";

Enzyme.configure({ adapter: new Adapter() });

test("Header basic test", () => {
  const confStore = {
    _value: "header text",
    underline: true,
    size: 1,
  };

  const view = render(<HtxHeader item={confStore} />);
  const text = view.text();

  expect(text).toBe("header text");
});
