import { FaPlus } from "react-icons/fa6";
import ToDo from "../../components/dashoboard/tasks/ToDo";
import Ongoing from "../../components/dashoboard/tasks/Ongoing";
import Completed from "../../components/dashoboard/tasks/Completed";

const Tasks = () => {

    return (
        <div className="p-4">
            <div className="sm:flex justify-between items-end mt-10 lg:mt-0 mb-4">
                <h4 className="uppercase font-semibold">Your workspaces</h4>
                <button className="btn">
                    <FaPlus />
                </button>
            </div>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div>
                    <ToDo />
                </div>
                <div>
                    <Ongoing />
                </div>
                <div>
                    <Completed />
                </div>
            </div>
        </div>
    )
};

export default Tasks