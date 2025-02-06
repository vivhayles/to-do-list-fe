import { useState } from "react";
import Navlink from "../Navlink";
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav id="links" className="bg-[#033c70] text-center py-1 px-2">
            <button
                className="text-xl text-[#faf4ef] font-semibold md:hidden"
                id="menu-button"
                onClick={toggleMenu}>
                {menuOpen ? "Close Menu" : "Open Menu"}
            </button>

            <div
                id="nav-links"
                className={`${
                    menuOpen ? "flex" : "hidden"
                } flex-col justify-start items-center py-1 px-2 sm:text-xl md:flex md:flex-row md:justify-around`}>
                <Navlink id="All Tasks" to='/' text="All Tasks"/>
                <Navlink id="Uncompleted Tasks" to="/uncompletedtaskspage" text="Uncompleted Tasks"/>
                <Navlink id="Completed Tasks" to="/completedtaskspage" text="Completed Tasks"/>
            </div>
        </nav>
    );
}

export default Navbar;
