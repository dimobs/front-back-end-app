import "@testing-library/jest-dom/vitest";
import { it, expect, describe, afterEach, beforeEach } from "vitest";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


import Header from "./Header";
import { AuthContext } from "../../context/auth/AuthContext";

let authContextValue;

beforeEach(async () => {
  authContextValue = {
    isAuthenticated: false,
    email: "",
    changeAuthState: () => {},
    logout: () => {},
  };
});

afterEach(() => {
  cleanup();
});

describe("HeaderTest", () => {
  it("shows `Login` button on first render", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ authContextValue }}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("click `Login` and render Login page", async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const singInElement = screen.getByText(/Login/i);

    await act(async () => {
      fireEvent.click(singInElement);
    });

    expect(window.location.pathname).toBe("/login");
  });

  it("click Home Link and render Home view", async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={(authContextValue = {})}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const allLinks = screen.getAllByRole("link");

    await act(async () => {
      fireEvent.click(allLinks[1]);
    });
    expect(window.location.pathname).toBe("/");
  });

  it("click Login Link and render Login form", async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={(authContextValue = {})}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const allLinks = screen.getAllByRole("link");
    await act(async () => {
      fireEvent.click(allLinks[2]);
    });
    expect(window.location.pathname).toBe("/login");
  });

  it("click Register Link and render User reg form", async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={(authContextValue = {})}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const allLinks = screen.getAllByRole("link");
    await act(async () => {
      fireEvent.click(allLinks[3]);
    });
    expect(window.location.pathname).toBe("/register");
  });

  it("click ContactUs Link and render contact form", async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={(authContextValue = {})}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const allLinks = screen.getAllByRole("link");
    console.log(allLinks[4]);

    await act(async () => {
      fireEvent.click(allLinks[4]);
    });
    expect(window.location.pathname).toBe("/contactUs");
  });
});
