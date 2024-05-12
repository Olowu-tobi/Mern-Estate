import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Tobi</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </NavLink>
        <form className="bg-slate-100 flex items-center gap-[2px] rounded-lg p-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4 text-slate-700">
          <NavLink to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </NavLink>{" "}
          <NavLink to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </NavLink>
          <NavLink to="/login">
            <li className=" hover:underline">Login</li>
          </NavLink>
        </ul>
      </div>
    </header>
  );
}

export default Header;
