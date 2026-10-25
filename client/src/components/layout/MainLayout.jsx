import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 p-3 sm:p-4 lg:p-5">
      <div className="shrink-0 rounded-2xl bg-white shadow-sm">
        <Header onOpenMenu={() => setIsSidebarOpen(true)} />
      </div>

      <div className="mt-3 flex flex-1 items-start gap-4 md:mt-4">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
