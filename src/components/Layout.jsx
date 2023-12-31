import "../styles/page.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Wrapper from "./Wrapper";
export default function Layout() {
  return (
    <div className="layout-component">
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
}
