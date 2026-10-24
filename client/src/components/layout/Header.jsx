import { MessageSquareCheck, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ onOpenMenu }) => {
  return (
    <header className="relative z-30 w-full rounded-2xl bg-white">
      <div className="px-4 py-4 sm:px-7 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            aria-label="LazyFlow AI — Go to Dashboard"
            className="flex min-w-0 items-center gap-3 rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:items-start sm:gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 sm:h-14 sm:w-14 sm:rounded-2xl">
              <MessageSquareCheck
                size={28}
                strokeWidth={2.2}
                className="text-blue-600 sm:h-8 sm:w-8"
              />
            </div>

            <div className="min-w-0">
              <div className="whitespace-nowrap text-xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                LazyFlow <span className="text-blue-600">AI</span>
              </div>

              <p className="mt-1 hidden max-w-xl text-sm font-medium leading-5 text-slate-500 sm:block">
                Turn messy messages into clear tasks. Less busywork, more flow.
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>

        <p className="mt-3 text-xs font-medium leading-5 text-slate-500 sm:hidden">
          Turn messy messages into clear tasks. Less busywork, more flow.
        </p>
      </div>
    </header>
  );
};

export default Header;
