import React from "react";
import { render, screen } from "@testing-library/react";
import Calculator from "../components/Calculator";


test("renders submit date input with correct default value", () => {
    render(<Calculator />);
    const submitDateInput = screen.getByTestId("submit-date");
    expect(submitDateInput).toBeInTheDocument();
});

test("renders turnaround time input with correct default value", () => {
    render(<Calculator />);
    const turnaroundTimeInput = screen.getByTestId("turnaround-time");
    expect(turnaroundTimeInput).toBeInTheDocument();
    expect(turnaroundTimeInput).toHaveValue(0);
});

test("renders turnaround time input with correct default value", () => {
    render(<Calculator />);
    const deadlineText = screen.getByTestId("deadline");
    expect(deadlineText).toBeInTheDocument();
    expect(deadlineText).toHaveTextContent(new Date(new Date().setHours(9,0,0,0)).toString());
});