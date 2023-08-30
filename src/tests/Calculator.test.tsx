import React from "react";
import { render, screen } from "@testing-library/react";
import Calculator from "../components/Calculator";

test("renders submit date input with correct default value", () => {
    render(<Calculator />);
    const submitDateInput = screen.getByTestId("submit-date");
    expect(submitDateInput).toBeInTheDocument();
    expect(submitDateInput).toHaveValue("2023-08-29T09:00");
});

test("renders turnaround time input with correct default value", () => {
    render(<Calculator />);
    const turnaroundTimeInput = screen.getByTestId("turnaround-time");
    expect(turnaroundTimeInput).toBeInTheDocument();
    expect(turnaroundTimeInput).toHaveValue(1);
});

test("renders turnaround time input with correct default value", () => {
    render(<Calculator />);
    const deadlineText = screen.getByTestId("deadline");
    expect(deadlineText).toBeInTheDocument();
    expect(deadlineText).toHaveTextContent("Tue Aug 29 2023 10:00:00 GMT+0200 (Central European Summer Time)");
});