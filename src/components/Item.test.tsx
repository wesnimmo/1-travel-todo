import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "./Item";

const mockItem = {
  id: 1,
  description: "Toothbrush",
  quantity: 2,
  packed: false,
};

test("shows input with description when edit icon is clicked", async () => {
  render(
    <Item 
      item={mockItem} 
      onDeleteItem={jest.fn()} 
      onToggleItem={jest.fn()}
      onEditItem={jest.fn()} 
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  const input = screen.getByDisplayValue("Toothbrush");
  expect(input).toBeInTheDocument();
});

test("allows user to edit quantity when in edit mode", async () => {
    const onEditItem = jest.fn();
    render(
      <Item
        item={mockItem}
        onDeleteItem={jest.fn()}
        onToggleItem={jest.fn()}
        onEditItem={onEditItem}
      />
    );
  
    // Enter edit mode
    const editButton = screen.getByTestId("edit-icon");
    await userEvent.click(editButton);
  
    // Find the quantity input and change its value
    const quantityInput = screen.getByDisplayValue("2");
    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, "5");
  
    // Click Save button to trigger save
    const saveButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(saveButton);
  
    await waitFor(() => {
      expect(onEditItem).toHaveBeenCalledWith("Toothbrush", 5);
    });
  });

test("saves changes when Enter is pressed in edit mode", async () => {
  const onEditItem = jest.fn();
  render(
    <Item
      item={mockItem}
      onDeleteItem={jest.fn()}
      onToggleItem={jest.fn()}
      onEditItem={onEditItem}
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  const descInput = screen.getByDisplayValue("Toothbrush");
  await userEvent.clear(descInput);
  await userEvent.type(descInput, "Toothpaste");
  await userEvent.keyboard("{Enter}");

  await waitFor(() => {
    expect(onEditItem).toHaveBeenCalledWith("Toothpaste", 2);
  });
});

test("user can edit both description and quantity and save both together", async () => {
  const onEditItem = jest.fn();
  render(
    <Item
      item={mockItem}
      onDeleteItem={jest.fn()}
      onToggleItem={jest.fn()}
      onEditItem={onEditItem}
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  const descInput = screen.getByDisplayValue("Toothbrush");
  const quantityInput = screen.getByDisplayValue("2");
  await userEvent.clear(descInput);
  await userEvent.type(descInput, "Toothpaste");
  await userEvent.clear(quantityInput);
  await userEvent.type(quantityInput, "5");

  const saveButton = screen.getByRole("button", { name: /save/i });
  await userEvent.click(saveButton);

  await waitFor(() => {
    expect(onEditItem).toHaveBeenCalledWith("Toothpaste", 5);
  });
});



test("restores original values and exits edit mode when Cancel is clicked", async () => {
  const onEditItem = jest.fn();
  render(
    <Item
      item={mockItem}
      onDeleteItem={jest.fn()}
      onToggleItem={jest.fn()}
      onEditItem={onEditItem}
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  // Change description and quantity
  const descInput = screen.getByDisplayValue("Toothbrush");
  const quantityInput = screen.getByDisplayValue("2");
  await userEvent.clear(descInput);
  await userEvent.type(descInput, "Toothpaste");
  await userEvent.clear(quantityInput);
  await userEvent.type(quantityInput, "5");

  // Click Cancel
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  await userEvent.click(cancelButton);

  // Original values should be shown and onEditItem should NOT have been called
  await waitFor(() => {
    expect(screen.getByText("2 Toothbrush")).toBeInTheDocument();
    expect(onEditItem).not.toHaveBeenCalled();
  })
  
});



test("restores original values and exits edit mode when Escape is pressed", async () => {
  const onEditItem = jest.fn();
  render(
    <Item
      item={mockItem}
      onDeleteItem={jest.fn()}
      onToggleItem={jest.fn()}
      onEditItem={onEditItem}
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  // Change description
  const descInput = screen.getByDisplayValue("Toothbrush");
  await userEvent.clear(descInput);
  await userEvent.type(descInput, "Toothpaste");

  // Press Escape
  await userEvent.keyboard("{Escape}");

   // Wait for UI to update before asserting
   await waitFor(() => {
    expect(screen.getByText("2 Toothbrush")).toBeInTheDocument();
    expect(onEditItem).not.toHaveBeenCalled();
  });
});


test("does not save if description is empty", async () => {
  const onEditItem = jest.fn();
  render(
    <Item
      item={mockItem}
      onDeleteItem={jest.fn()}
      onToggleItem={jest.fn()}
      onEditItem={onEditItem}
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  const descInput = screen.getByDisplayValue("Toothbrush");
  await userEvent.clear(descInput);

  const saveButton = screen.getByRole("button", { name: /save/i });
  await userEvent.click(saveButton);

  await waitFor(() => {
    expect(onEditItem).not.toHaveBeenCalled();
  })
  // Optionally: check for error message or that edit mode is still active
});

test("does not save if quantity is less than 1", async () => {
  const onEditItem = jest.fn();
  render(
    <Item
      item={mockItem}
      onDeleteItem={jest.fn()}
      onToggleItem={jest.fn()}
      onEditItem={onEditItem}
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  const quantityInput = screen.getByDisplayValue("2");
  await userEvent.clear(quantityInput);
  await userEvent.type(quantityInput, "0");

  const saveButton = screen.getByRole("button", { name: /save/i });
  await userEvent.click(saveButton);

  await waitFor(() => {
    expect(onEditItem).not.toHaveBeenCalled();
    // Optionally: check for error message or that edit mode is still active
  })
  
});


test("autofocuses description input when entering edit mode", async () => {
  render(
    <Item
      item={mockItem}
      onDeleteItem={jest.fn()}
      onToggleItem={jest.fn()}
      onEditItem={jest.fn()}
    />
  );

  const editButton = screen.getByTestId("edit-icon");
  await userEvent.click(editButton);

  const descInput = screen.getByDisplayValue("Toothbrush");
  await waitFor(() => {
    expect(document.activeElement).toBe(descInput);
  })
});



