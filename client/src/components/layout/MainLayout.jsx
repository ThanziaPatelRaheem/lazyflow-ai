import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-5">
      <div className="rounded-2xl bg-white shadow-sm">
        <Header onOpenMenu={() => setIsSidebarOpen(true)} />
      </div>

      <div className="mt-3 flex items-stretch gap-4 md:mt-4 md:items-start">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="min-w-0 flex-1">
          <div className="flex min-h-[calc(100vh-9rem)] w-full flex-col">
            <div className="flex-1">
              <Outlet />
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
