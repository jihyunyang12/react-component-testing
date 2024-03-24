import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StateForm } from "./StateForm";
import { RefForm } from "./RefForm";
import userEvent from "@testing-library/user-event";

describe("Form component", () => {
  it("should call onSubmit when form is submitted with valid email and password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<RefForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    const email = "abc@webdevsimplified.com";
    const password = "Abcdefg123$";

    await user.type(emailInput, email);
    await user.type(passwordInput, password);

    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith({ email, password });
    expect(screen.queryByTestId("email-errors")).not.toBeInTheDocument();
    expect(screen.queryByTestId("password-errors")).not.toBeInTheDocument();
  });

  it("should not call onSubmit when form is submitted with invalid email and password", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RefForm onSubmit={onSubmit} />);

    const email = "abc@email.com";
    const password = "Abcde";

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    expect(onSubmit).not.toHaveBeenCalledOnce();
    expect(screen.getByTestId("email-errors")).toBeInTheDocument();
    expect(screen.getByTestId("password-errors")).toBeInTheDocument();
  });

  it("should update the error messages when updating form values after first submit", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RefForm onSubmit={onSubmit} />);

    const email = "abc@email.com";
    const password = "Abcde";

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    const validEmail = "abc@webdevsimplified.com";
    await user.type(screen.getByLabelText("Email"), validEmail);

    expect(onSubmit).not.toHaveBeenCalledOnce();
    expect(screen.queryByTestId("email-errors")).not.toBeInTheDocument();
    expect(screen.getByTestId("password-errors")).toBeInTheDocument();
  });
});
