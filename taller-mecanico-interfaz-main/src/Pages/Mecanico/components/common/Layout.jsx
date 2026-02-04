import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      {/** Main Content */}
      <div>
        <Navbar />
        {children}
      </div>
    </>
  );
};
