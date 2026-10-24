import { LayoutDashboard, Bookmark, X, Plus, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const collectionColors = [
  "bg-blue-50 text-blue-500",
  "bg-orange-50 text-orange-500",
  "bg-emerald-50 text-emerald-500",
  "bg-violet-50 text-violet-500",
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [savedLists, setSavedLists] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lazyflow-saved-lists") || "[]");
    } catch {
      return [];
    }
  });

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:px-4 md:py-3 md:text-base ${
      isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
    }`;

  const handleAddTaskClick = () => {
    setIsOpen(false);

    navigate("/", {
      state: { openAddTaskModal: true },
    });
  };

  useEffect(() => {
    const refreshSavedLists = () => {
      try {
        setSavedLists(
          JSON.parse(localStorage.getItem("lazyflow-saved-lists") || "[]"),
        );
      } catch {
        setSavedLists([]);
      }
    };

    window.addEventListener("focus", refreshSavedLists);
    window.addEventListener("lazyflow-lists-updated", refreshSavedLists);

    return () => {
      window.removeEventListener("focus", refreshSavedLists);
      window.removeEventListener("lazyflow-lists-updated", refreshSavedLists);
    };
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden rounded-r-2xl bg-white p-6 shadow-sm transition-transform duration-300 md:sticky md:top-4 md:z-20 md:h-[calc(100vh-2.5rem)] md:shrink-0 md:translate-x-0 md:rounded-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-2" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={navLinkClasses}
          >
            <LayoutDashboard className="h-[18px] w-[18px] md:h-5 md:w-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/saved-lists"
            onClick={() => setIsOpen(false)}
            className={navLinkClasses}
          >
            <Bookmark className="h-[18px] w-[18px] md:h-5 md:w-5" />
            Saved Lists
          </NavLink>
        </nav>

        <div className="mt-5 border-t border-slate-200" />

        <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
          <div className="mb-3 px-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Saved Collections
            </p>
          </div>

          <div className="space-y-1">
            {savedLists.length === 0 ? (
              <p className="px-4 text-sm text-slate-400">
                No saved collections
              </p>
            ) : (
              savedLists.map((list, index) => (
                <NavLink
                  key={list.id}
                  to={`/saved-lists/${list.id}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors md:gap-3 md:px-3 md:py-2 ${
                      isActive ? "bg-blue-50" : "hover:bg-slate-50"
                    }`
                  }
                >
                  <div
                    className={`rounded-lg p-2 ${
                      collectionColors[index % collectionColors.length]
                    }`}
                  >
                    <Folder className="h-[18px] w-[18px] md:h-5 md:w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {list.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {list.tasks.length}{" "}
                      {list.tasks.length === 1 ? "task" : "tasks"}
                    </p>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddTaskClick}
          className="mt-3 flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100 md:mt-4 md:px-4 md:py-3 md:text-base"
        >
          <Plus className="h-[18px] w-[18px] md:h-5 md:w-5" />
          Add Task
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
