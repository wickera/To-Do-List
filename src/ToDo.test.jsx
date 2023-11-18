import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ToDo from "./ToDo";

test("renders ToDo component", () => {
  const { getByText, getByPlaceholderText } = render(<ToDo />);

  // Assert that the component renders without crashing
  expect(getByText("What's on the schedule for today?")).toBeInTheDocument();

  // Add a task and check if it's displayed
  const inputElement = getByPlaceholderText("Add a new task");
  fireEvent.change(inputElement, { target: { value: "Test" } });
  fireEvent.submit(inputElement);
  expect(getByText("Test")).toBeInTheDocument();
});

test("completes a task", () => {
  const { getByText, getByPlaceholderText } = render(<ToDo />);

  // Mark a task as complete and check if it has a strikethrough style
  const inputElement = getByPlaceholderText("Add a new task");
  fireEvent.change(inputElement, { target: { value: "Test" } });
  fireEvent.submit(inputElement);
  const taskElement = getByText("Test");
  fireEvent.click(getByText("Test").previousElementSibling);
  expect(taskElement).toHaveStyle("text-decoration: line-through");
});

test("delete a task", () => {
  render(<ToDo />);

  // Add a task to the list
  fireEvent.change(screen.getByPlaceholderText("Add a new task"), {
    target: { value: "Sample Task" },
  });
  fireEvent.submit(screen.getByLabelText("add a new task"));

  // Asserts a task is initially rendered
  expect(screen.getByText("Sample Task")).toBeInTheDocument();

  // Click the "Delete" button for the task
  fireEvent.click(screen.getByLabelText("delete"));

  // Check that the task is deleted
  expect(screen.queryByText("Sample Task")).toBeNull();
});

test("editTask updates the task when in editing mode", () => {
  render(<ToDo />);

  // Add a task to the list
  fireEvent.change(screen.getByPlaceholderText("Add a new task"), {
    target: { value: "Sample Task" },
  });
  fireEvent.submit(screen.getByLabelText("add a new task"));

  // Find the "edit" button for the task
  const editButton = screen.getByLabelText("edit");

  // Click the "edit" button to enter editing mode
  fireEvent.click(editButton);

  // Find the input field for editing
  const editInput = screen.getByPlaceholderText("Edit Task");

  // Update the task text in the input field
  fireEvent.change(editInput, { target: { value: "Updated Task" } });

  // Find the "submit" button for editing
  const saveButton = screen.getByLabelText("submit");

  // Click the "submit" button to save the edited task
  fireEvent.click(saveButton);

  // Check that the task is updated in the UI
  expect(screen.getByText("Updated Task")).toBeInTheDocument();
});
