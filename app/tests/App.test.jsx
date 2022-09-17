import {render, screen} from "@testing-library/react"
import App from "../src/App"
test("checking if wiptest works", () => {
  render(<App />)
  screen.findByText(/React/)
});