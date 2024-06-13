import { BsFillArrowDownRightSquareFill } from "react-icons/bs";
// import bannerImg from "../../assets/bannerImg.jpg";
import { Link } from "react-router-dom";

const Banner = () => {

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${"bannerImg"})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-md">
                    <h2 className="mb-5 text-3xl font-bold">LekhaLipi: Write Your Travel Story</h2>
                    <p className="mb-5">Join LekhaLipi as we explore the world's wonders, crafting unforgettable travel stories and adventures.</p>
                    <Link to="/login" className="btn btn-primary btn-sm text-white uppercase mt-3">
                        <span>Let's Explore</span>
                        <BsFillArrowDownRightSquareFill />
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Banner