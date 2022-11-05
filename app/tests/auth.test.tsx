import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import { client } from "../src/utils";

test("Sign in/up form", async () => {
  render(<App />);
  await screen.findByText(/Supacontent/);
  await screen.findByText(/Email/);
  await screen.findAllByText(/Password/);
  const signUpBtn = await screen.findByText(/Sign Up/);
  await screen.findByText(/Sign In/);

  fireEvent.click(signUpBtn);

  expect(client.auth.signUp).toBeCalled;
  await screen.findByText(/check your email/);
});
