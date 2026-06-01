import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main className="min-h-screen pt-20">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
