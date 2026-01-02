import { Outlet } from "react-router-dom";
import PublicHeader from "./header";
import PublicFooter from "./footer";

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
