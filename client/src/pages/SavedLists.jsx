import { useState } from "react";
import {
  Bookmark,
  CalendarDays,
  Folder,
  Pencil,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/common/ConfrimModal";
import RenameListModal from "../components/collections/RenameListModal";
import { capitalizeFirstLetter } from "../utils/formatText";

const collectionColors = [
  "bg-blue-100 text-blue-600",
  "bg-orange-100 text-orange-600",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
];

const SavedLists = () => {
  const [savedLists, setSavedLists] = useState(() => {
    try {
      const data = localStorage.getItem("lazyflow-saved-lists");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [listToDelete, setListToDelete] = useState(null);
  const [listToRename, setListToRename] = useState(null);

  const handleRenameList = (listId) => {
    const list = savedLists.find((item) => item.id === listId);

    if (!list) return;

    setListToRename(list);
  };

  const confirmRenameList = (listId, newName) => {
    const formattedName = capitalizeFirstLetter(newName);
    if (!formattedName) return;

    const updatedLists = savedLists.map((item) =>
      item.id === listId ? { ...item, name: formattedName } : item,
    );

    setSavedLists(updatedLists);

    localStorage.setItem("lazyflow-saved-lists", JSON.stringify(updatedLists));

    window.dispatchEvent(new Event("lazyflow-lists-updated"));

    setListToRename(null);
  };

  const handleDeleteList = (listId) => {
    const list = savedLists.find((item) => item.id === listId);

    if (!list) return;

    setListToDelete(list);
  };

  const confirmDeleteList = () => {
    if (!listToDelete) return;

    const updatedLists = savedLists.filter(
      (item) => item.id !== listToDelete.id,
    );

    setSavedLists(updatedLists);

    localStorage.setItem("lazyflow-saved-lists", JSON.stringify(updatedLists));

    window.dispatchEvent(new Event("lazyflow-lists-updated"));

    setListToDelete(null);
  };

  return (
    <section>
      <div className="mb-5 flex flex-col items-start gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Saved Lists
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-600 md:mt-2 md:text-base md:leading-normal">
            Your organized task collections in one place.
          </p>
        </div>

        <span className="inline-flex shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 md:py-1.5 md:text-sm">
          {savedLists.length}{" "}
          {savedLists.length === 1 ? "collection" : "collections"}
        </span>
      </div>

      {savedLists.length === 0 ? (
        <div className="rounded-xl bg-slate-100 p-10 text-center">
          <Bookmark className="mx-auto mb-3 text-slate-400" size={32} />

          <h2 className="font-semibold text-slate-800">No saved lists yet</h2>

          <p className="mt-2 text-sm text-slate-500">
            Generate tasks on your Dashboard and save them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {savedLists.map((list, index) => (
            <article
              key={list.id}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md md:p-5"
            >
              <Link
                to={`/saved-lists/${list.id}`}
                className="group block flex-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`rounded-xl p-2.5 md:p-3 ${
                      collectionColors[index % collectionColors.length]
                    }`}
                  >
                    <Folder className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]" />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-400 transition-colors group-hover:text-blue-600"
                  />
                </div>

                <h2 className="mt-3 break-words text-sm font-semibold text-slate-900 group-hover:text-blue-600 md:mt-4 md:text-base">
                  {list.name}
                </h2>

                <p className="mt-1 text-sm text-slate-600 md:mt-2">
                  {list.tasks.length}{" "}
                  {list.tasks.length === 1 ? "task" : "tasks"}
                </p>

                <p className="mt-2 flex items-center gap-2 text-xs text-slate-500 md:mt-3">
                  <CalendarDays size={15} />
                  Saved {new Date(list.createdAt).toLocaleDateString()}
                </p>
              </Link>

              <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-200 pt-3 md:mt-5 md:pt-4">
                <button
                  type="button"
                  onClick={() => handleRenameList(list.id)}
                  className="flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1.5 md:px-3 md:py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                >
                  <Pencil size={15} />
                  Rename
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteList(list.id)}
                  className="flex items-center gap-2 rounded-lg bg-rose-50 px-2.5 py-1.5 md:px-3 md:py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {listToDelete && (
        <ConfirmModal
          title="Delete collection?"
          message={`Are you sure you want to delete "${listToDelete.name}"? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={confirmDeleteList}
          onClose={() => setListToDelete(null)}
        />
      )}

      {listToRename && (
        <RenameListModal
          list={listToRename}
          onSave={confirmRenameList}
          onClose={() => setListToRename(null)}
        />
      )}
    </section>
  );
};

export default SavedLists;
