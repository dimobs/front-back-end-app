import { Routes, Route } from "react-router-dom";

import ConfirmModal from "./util/confirmModal/ConfirmModal";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { LoadingProvider } from "./context/spinner/SpinnerContext";
import { ErrorProvider } from "./context/notification/ErrorContext";
import { ConfirmProvider } from "./context/notification/confirmModal/ConfirmContext";
import ErrorNotification from "./context/notification/ErrorNotification";
import LoadingSpinner from "./context/spinner/Spinner";
import NotFound from "./components/NotFound404/NotFound";
import PrivateGuard from "./components/common/PrivateGuard";
import Header from "./components/Header/Header";
import TableRow from "./components/TableRow/TableRow";
import EditTable from "./components/tableRow/EditTable";
import TableDetails from "./components/TableRow/TableDetails";
import ProfileDetails from "./components/profile/Profile";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import Logout from "./components/logout/logout";
import ContactUs from "./components/contactUs/ContactUs";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <LoadingProvider>
          <LoadingSpinner />
              <ErrorProvider>
            <ConfirmProvider>
              <ErrorNotification />
              <Routes>
                <Route path="/" element={<TableRow />} />
                <Route element={<PrivateGuard />}>
                  <Route path="/item/:itemId" element={<TableDetails />} />
                  <Route path="/edit/:itemId" element={<EditTable />} />
                  <Route path="/profile" element={<ProfileDetails />} />
                  <Route path="/logout" element={<Logout />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
                <Route path="/confirm" element={<ConfirmModal />} />
              </Routes>
            </ConfirmProvider>
                </ErrorProvider>
                </LoadingProvider>    
      </AuthContextProvider>
    </>
  );
};

export default App;
