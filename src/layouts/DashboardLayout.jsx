import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaBlogger, FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { FaCirclePlus } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";

const DashboardLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout(navigate)
    };
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-[#e8ecef]">
                <Outlet />
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-sm btn-outline drawer-button lg:hidden absolute left-2 top-2"
                >
                    <FaBars />
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-60 min-h-screen bg-base-200 text-base-content flex flex-col justify-between">
                    <div>
                        <li>
                            <Link to="/dashboard">
                                <MdSpaceDashboard size={24} />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="workspaces">
                                <BsPersonWorkspace size={24} />
                                <span>Workspaces</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="profile">
                                <FaUser size={24} />
                                <span>My Profile</span>
                            </Link>
                        </li>
                    </div>
                    <div className="flex gap-4">
                        <Link to={"/"} className="btn btn-neutral">
                            Home
                        </Link>
                        <button className="btn btn-error text-white" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout