import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

afterEach(cleanup);

it("Should render the input element", () => {
  let data = "";
  const onChange:React.ChangeEventHandler<HTMLInputElement> = (e) => data = e.target.value;

  const { getByText, getByRole } = render(
    <Input type="text" placeholder="" onChange={onChange} />
  );
  fireEvent.change(getByRole("textbox"), {target: {value: "changed"}});
  expect(data).toBe("changed");
});
