import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

afterEach(cleanup);

it("Should render the button and its content", () => {
  let counter = 0;
  const onClick = () => counter++;

  const { getByText } = render(
    <Button onClick={onClick}>TEST</Button>
  );
  fireEvent.click(getByText("TEST"))
  expect(counter).toBe(1);
  expect(getByText("TEST")).toBeTruthy();
});
