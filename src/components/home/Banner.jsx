import { BsFillArrowDownRightSquareFill } from "react-icons/bs";
import bannerImg from "../../assets/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerImg})` }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-lg">
                    <h2 className="mb-5 text-3xl font-bold">Talika: Organize Your Journey</h2>
                    <p className="mb-5">Join Talika as we navigate the complexities of daily life, achieving your goals and milestones with ease and efficiency.</p>
                    <Link to="/login" className="btn bg-blue-600 hover:bg-blue-700 btn-sm rounded-sm border-none text-white uppercase mt-3">
                        <span>Let's Explore</span>
                        <BsFillArrowDownRightSquareFill />
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Banner