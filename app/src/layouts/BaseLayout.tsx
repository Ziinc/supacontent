import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

interface Props {
  children?: React.ReactNode;
}
const BaseLayout: React.FC<Props> = ({ children }) => (
  <div className="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content h-full">
      <div className="mx-auto h-full ">
        <Outlet />
      </div>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary drawer-button lg:hidden"
      >
        Open drawer
      </label>
    </div>
    <div className="drawer-side border-r border-neutral-900   overflow-visible">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <Sidebar />
    </div>
  </div>
);

export default BaseLayout;
