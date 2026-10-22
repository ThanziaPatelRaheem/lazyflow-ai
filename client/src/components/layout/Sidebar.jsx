import { LayoutDashboard, Bookmark, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
      isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="fixed top-4 left-4 z-30 rounded-lg bg-white p-2 shadow-md md:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white p-6 transition-transform duration-300 md:z-20 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">🌱 LazyFlow AI</h2>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={navLinkClasses}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/saved-lists"
            onClick={() => setIsOpen(false)}
            className={navLinkClasses}
          >
            <Bookmark size={20} />
            Saved Lists
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
