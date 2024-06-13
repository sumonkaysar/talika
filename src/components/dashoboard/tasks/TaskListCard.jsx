import { useDrag } from "react-dnd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

const TaskListCard = ({ task }) => {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: "Card",
            item: {task},
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }),
        []
    )

    return (
        <div ref={dragRef} className={`text-xs mt-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer mx-4 transition-all ${isDragging && "opacity-25"}`}>
            <div className="flex items-center justify-between gap-3">
                <div className="w-full p-2">{task}</div>
                <div className="dropdown">
                    <button className="pr-2" tabIndex={0} role="button">
                        <BsThreeDotsVertical />
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded w-24 right-0 top-0 p-0 py-1">
                        <li className="text-[12px] mx-1">
                            <div className="p-0 px-2 py-1 text-gray-900 rounded">
                                <FaEye />
                                <span>Details</span>
                            </div>
                        </li>
                        <li className="text-[12px] mx-1">
                            <div className="p-0 px-2 py-1 text-gray-900 rounded">
                                <MdEditSquare />
                                <span>Edit</span>
                            </div>
                        </li>
                        <li className="text-[12px] mx-1">
                            <div className="p-0 px-2 py-1 text-error rounded">
                                <RiDeleteBin2Line />
                                <span>Delete</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="px-2 text-[12px]">Lorem ipsum dolor sit amet consectetur adipisicing akshs ahshsh elit. ...</p>
            <p className="px-2 pt-1 pb-3 text-[11px]">
                <span className="font-semibold">Deadline: </span>
                <span className="">12:00 am, 12th Oct, 2024</span>
            </p>
        </div>
    )
};

export default TaskListCard