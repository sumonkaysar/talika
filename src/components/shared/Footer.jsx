import { Link } from "react-router-dom";
// import logo from "../../assets/lekha-lipi.svg";
// import ll from "../../assets/ll.svg";

const Footer = () => {
    return (
        <div className="bg-gray-200">
            <footer className="footer footer-center p-10">
                <nav className="grid grid-flow-col gap-4">
                    <Link to='/about' className="link link-hover">About us</Link>
                    <Link to='/contact' className="link link-hover">Contact</Link>
                </nav>
                <aside>
                    <div className="max-w-16">
                        {/* <img src={ll} alt="LekhaLipi" /> */}
                    </div>
                    <div className="max-w-[250px]">
                        {/* <img src={logo} alt="LekhaLipi" /> */}
                    </div>
                    <p>Copyright © 2024 - All right reserved</p>
                </aside>
            </footer>
        </div>
    )
};

export default Footer