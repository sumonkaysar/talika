import { Link } from "react-router-dom";
import logo from "../../assets/logo/talika.svg";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-gray-200">
            <footer className="footer p-10 items-center">
                <aside>
                    <div className="max-w-[70px]">
                        <img className="w-full" src={logo} alt="Talika" />
                    </div>
                    <p>Copyright © 2024 - All right reserved</p>
                </aside>
                <nav>
                    <h6 className="text-gray-800 font-semibold        uppercase text-[18px]">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <Link to={`https://www.facebook.com/sumon.kaysar.sk`} className="text-lg hover:text-blue-600 transition">
                            <FaFacebook />
                        </Link>
                        <Link to={`https://linkedin.com/in/sumonkaysar`} className="text-lg hover:text-blue-600 transition">
                            <FaLinkedin />
                        </Link>
                        <Link to={`https://github.com/sumonkaysar`} className="text-lg hover:text-blue-600 transition">
                            <FaGithub />
                        </Link>
                    </div>
                </nav>
            </footer>
        </div>
    )
};

export default Footer