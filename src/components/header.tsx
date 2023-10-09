import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores/store";
import { logout, selectAuth } from "@/stores/auth";

export function Header() {
  const isAuth: boolean = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();

  const toggleMenu = () => {
    const html = document.documentElement;
    const menu = document.getElementById("navbar-default") as HTMLDivElement;
    const button = document.getElementById("navbar-button") as HTMLButtonElement;

    if (menu) {
      menu.classList.toggle("hidden");
      html.addEventListener("click", (e) => {
        if (e.target !== button && !button.contains(e.target as Node)) {
          menu.classList.add("hidden");
        }
      });
    }
  };

  return (
    <header className="relative z-10 border-b-2">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl leading-7 pb-2 font-semibold whitespace-nowrap dark:text-white">
              Simple Header 
            </span>
          </Link>
          <Button
            id="navbar-button"
            data-collapse-toggle="navbar-default"
            type="button"
            className="bg-zinc-100 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => toggleMenu()}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </Button>
          <div
            className={`hidden top-14 -ml-4 absolute w-full lg:block lg:w-auto lg:static lg:ml-0`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col items-center p-4 lg:p-0 mt-4 border border-gray-100 rounded-b-2xl border-b-2 border-b-gray-300 border-s-gray-300 border-e-gray-300 bg-gray-100 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              <li className="rounded w-full max-w-[350px] bg-slate-200 lg:bg-transparent lg:w-fit">
                <div className="flex justify-center items-center h-10">
                  <Link
                    to="/"
                    className="block text-center pb-[0.20rem] text-black hover:underline rounded dark:text-white w-full"
                    aria-current="page"
                  >
                    <span>Home</span>
                  </Link>
                </div>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block text-center py-2 pl-3 pr-3 text-gray-500 font-semibold rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:px-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent w-full hover:underline"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block text-center py-2 pl-3 pr-3 text-gray-500 font-semibold rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:px-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-default w-full"
                  onClick={(e) => e.preventDefault()}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block text-center py-2 pl-3 pr-3 text-gray-500 font-semibold rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:px-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-default w-full"
                  onClick={(e) => e.preventDefault()}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block text-center py-2 pl-3 pr-3 text-gray-500 font-semibold rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:px-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-default w-full"
                  onClick={(e) => e.preventDefault()}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block text-center py-2 pl-3 pr-3 text-gray-500 font-semibold rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:px-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-default w-full"
                  onClick={(e) => e.preventDefault()}
                >
                  About
                </Link>
              </li>
              {isAuth ? (
                <li className="rounded w-full max-w-[100px] bg-red-400 lg:bg-transparent lg:w-fit">
                  <Link
                    to="/login"
                    className="block text-center py-2 pl-3 pr-3 text-white lg:text-red-500 hover:underline font-semibold rounded lg:hover:bg-transparent lg:border-0 lg:px-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent w-full"
                    onClick={() => {
                      auth.logout();
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <div className="flex gap-3 w-full justify-center">
                  <li className="bg-blue-500 rounded w-full max-w-[120px] lg:w-fit">
                    <div className="flex justify-center items-center h-10">
                      <Link
                        to="/login"
                        className="block text-center lg:pl-6 lg:pr-6 pb-[0.20rem] text-white rounded dark:text-white w-full"
                      >
                        Login
                      </Link>
                    </div>
                  </li>
                  <li className="bg-teal-500 rounded w-full max-w-[120px] lg:w-fit">
                    <div className="flex justify-center items-center h-10">
                      <Link
                        to="/signup"
                        className="block text-center lg:pl-4 lg:pr-4 pb-[0.20rem] text-white rounded dark:text-white w-full whitespace-nowrap"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
