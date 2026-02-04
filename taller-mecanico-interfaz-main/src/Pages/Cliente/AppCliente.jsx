import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Login } from "./Login";

export const AppCliente = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
