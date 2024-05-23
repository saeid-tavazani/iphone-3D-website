import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

const Navbar = () => {
  return (
    <header className="w-full py-5 px-5 sm:px-10 flex items-center justify-between">
      <nav className="flex w-full screen-max-width items-center">
        <img src={appleImg} alt="Appel" className="w-[14px]" />
        <ul className="flex flex-1 justify-center max-sm:hidden gap-5">
          {navLists.map((nav, i) => (
            <li
              className="text-sm cursor-pointer text-gray hover:text-white transition-all"
              key={i}
            >
              {nav}
            </li>
          ))}
        </ul>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="searc" className="w-[18px]" />
          <img src={bagImg} alt="bag" className="w-[18px]" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
