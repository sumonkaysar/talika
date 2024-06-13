import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/talika.svg";
import useAuth from "../../hooks/useAuth";
import userImg from "../../assets/user.png";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(navigate);
    };

    const menuItems = <>
        <li>
            <Link to="/">Home</Link>
        </li>
        {
            user?.email && <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
        }
        <li>
            <Link to="/contact">Contacts</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
    </>;

    return (
        <div className="bg-base-200 sticky top-0 z-50">
            <nav className="navbar w-11/12 max-w-[1440px] mx-auto px-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to="/" className="max-w-[80px]">
                        <img className="h-[80px]" src={logo} alt="Talika" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.uid ?
                            <div className="navbar-end flex justify-end">
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL || userImg} />
                                        </div>
                                    </div>
                                    <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded w-52 right-0">
                                        <div className="text-center mb-4 pb-3 border-b-2 border-primary">
                                            <h5 className=" font-semibold">Welcome!</h5>
                                            <h4 className="text-lg font-semibold">{user?.displayName}</h4>
                                        </div>
                                        <div>
                                            <Link to={"/dashboard/profile"} className="w-full btn btn-sm bg-[#064e89] text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px] border-[#044275] hover:border-[#044d88] hover:bg-[#044275] mb-2">
                                                Profile
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to={"/dashboard"} className="w-full btn btn-sm bg-[#064e89] text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px] border-[#044275] hover:border-[#044d88] hover:bg-[#044275] mb-2">
                                                Dashboard
                                            </Link>
                                        </div>
                                        <div>
                                            <button className="w-full btn btn-sm btn-error text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px]" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> : <>
                                <Link to="/login" className="btn btn-sm bg-[#064e89] text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px] border-[#064e89] hover:border-[#0572ca] hover:bg-[#0572ca]">Login</Link>
                                <Link to="/signup" className="btn btn-outline btn-sm text-[#064e89] hover:text-white hover:bg-[#064e89] hover:border-[#064e89] py-2 h-fit min-h-fit text-[14px] rounded-[4px] ml-2">Signup</Link>
                            </>
                    }
                </div>
            </nav>
        </div>
    )
};

export default Navbar