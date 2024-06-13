import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Workspaces = () => {
    const workspaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="p-4">
            <div className="sm:flex justify-between items-end mt-10 lg:mt-0 mb-4">
                <h4 className="uppercase font-semibold">Your workspaces</h4>
                <div className="flex items-center justify-between bg-white rounded-badge pl-4 py-1 pr-3 mt-2 mb-2 sm:mt-0 sm:mb-0">
                    <input className="w-36" placeholder="Search..." type="text" />
                    <FaSearch className="text-gray-500" />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 2xl:gap-10">
                {
                    workspaces.map(workspace => <Link to={`/dashboard/workspaces/111`} className="hero h-[160px] sm:h-[120px] 2xl:h-[160px] rounded-sm overflow-hidden" style={{ backgroundImage: 'url(https://www.dynamitenews.com/images/2022/05/31/health-5-essential-guidelines-while-working-on-computer/6295cffb4cbf0.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40 w-full h-full"></div>
                        <div className="hero-content text-center text-white px-2 pt-1 h-full w-full justify-start items-start">
                            <div className="">
                                <h5 className="font-semibold">Talika</h5>
                            </div>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    )
};

export default Workspaces