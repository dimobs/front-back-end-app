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

import EditTable from "./EditTable";
import { AuthContext } from "../../context/auth/AuthContext";
import { ConfirmProvider } from "../../context/notification/confirmModal/ConfirmContext";

let authContextValue;
let confirmValue;
beforeEach(async () => {
  authContextValue = {
    isAuthenticated: false,
    email: "",
    changeAuthState: () => {},
    logout: () => {},
  };
  confirmValue = {
confirm: () => {},
  }
});

afterEach(() => {
  cleanup();
});

describe("Edit test", () => {
      it("Edit details page render", () => {
        render(
          <BrowserRouter>
            <AuthContext.Provider value={{ authContextValue }}>
                <ConfirmProvider value={confirmValue}>
              <EditTable />
                </ConfirmProvider>
            </AuthContext.Provider>
          </BrowserRouter>
        );

      });

 
});
