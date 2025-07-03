import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "./Item";

const mockItem = {
    id: 1,
    description: "Toothbrush",
    quantity: 2,
    packed: false,
  };

  test("shows input with description when edit icon is clicked", async () => {
    render(<Item item={mockItem} onDeleteItem={jest.fn()} onToggleItem={jest.fn()} />)


    const editButton = screen.getByTestId("edit-icon")
    await userEvent.click(editButton)

    const input = screen.getAllByDisplayValue("Toothbrush")
    expect(input).toBeInTheDocument()


  })