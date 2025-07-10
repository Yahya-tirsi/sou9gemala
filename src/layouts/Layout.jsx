import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-layout">
      {/* You can add header/navigation here */}
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>
      {/* You can add footer here */}
    </div>
  );
};

export default Layout;
