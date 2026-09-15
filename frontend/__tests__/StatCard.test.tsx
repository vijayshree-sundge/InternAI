import { render, screen } from "@testing-library/react";
import StatCard from "@/components/StatCard";

test("StatCard renders label and value", () => {
  render(<StatCard label="Total Interns" value={12} />);
  expect(screen.getByText("Total Interns")).toBeInTheDocument();
  expect(screen.getByText("12")).toBeInTheDocument();
});
