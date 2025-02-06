import { Link } from "react-router-dom";

function NavLink({ to, text }) {
    return (
        <Link className="font-semibold mx-4 my-2 text-xl text-[#faf4ef]" to={to}>
            {text}
        </Link>
    );
}

export default NavLink;
