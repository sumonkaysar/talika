import axios from "axios";
import moment from "moment";
import { useDrag } from "react-dnd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { server } from "../../../../links";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Modal from "../../shared/Modal";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import TaskDetailsModal from "./TaskDetailsModal";

const TaskListCard = ({ task, refetch, currentStatus }) => {
    const talikaToken = Cookies.get("talikaToken");
    const editCloseBtnRef = useRef();
    const deleteCloseBtnRef = useRef();
    const detailsCloseBtnRef = useRef();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { _id, title, deadline, description, priority } = task;
    const [newDeadline, setNewDeadline] = useState(new Date(deadline));
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: "Card",
            item: { taskId: _id, currentStatus },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        })
    )

    const deleteTask = () => {
        axios.delete(`${server}/tasks/${_id}`, { "headers": { "authorization": `Bearer ${talikaToken}` } })
            .then(({ data }) => {
                toast.warning("Task is Deleted successfully");
                refetch();
                deleteCloseBtnRef.current.click();
                detailsCloseBtnRef.current.click();
            })
            .catch(err => console.log(err))
    }

    const editTask = data => {
        const { title, description, priority } = data;
        const task = {
            title,
            description,
            priority,
            deadline: newDeadline.getTime(),
        }
        axios.patch(`${server}/tasks/${_id}`, task, { "headers": { "authorization": `Bearer ${talikaToken}` } })
            .then(({ data }) => {
                toast.success("Task is updated successfully");
                refetch();
                editCloseBtnRef.current.click();
                detailsCloseBtnRef.current.click();
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div ref={dragRef} className={`text-xs mt-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer mx-4 transition-all ${isDragging && "opacity-25"}`}>
                <div className="flex items-center justify-between gap-3">
                    <div className="w-full p-2 font-medium">{title}</div>
                    <div className="dropdown">
                        <button className="pr-2" tabIndex={0} role="button">
                            <BsThreeDotsVertical />
                        </button>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded w-24 right-0 top-0 p-0 py-1">
                            <li onClick={() => document.getElementById(`taskDetailsModal${_id}`).showModal()} className="text-[12px] mx-1">
                                <div className="p-0 px-2 py-1 text-gray-900 rounded">
                                    <FaEye />
                                    <span>Details</span>
                                </div>
                            </li>
                            <li onClick={() => document.getElementById(`editTaskModal${_id}`).showModal()} className="text-[12px] mx-1">
                                <div className="p-0 px-2 py-1 text-gray-900 rounded">
                                    <MdEditSquare />
                                    <span>Edit</span>
                                </div>
                            </li>
                            <li onClick={() => document.getElementById(`deleteTaskModal${_id}`).showModal()} className="text-[12px] mx-1">
                                <div className="p-0 px-2 py-1 text-error rounded">
                                    <RiDeleteBin2Line />
                                    <span>Delete</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="px-2 text-[12px]">{
                    description?.length > 100 ? description?.slice(0, 30) : description
                }</p>
                {/* <p className="px-2 pt-4 text-[11px]">{priority} Priority</p> */}
                <p className="px-2 pb-3 text-[11px] mt-3">
                    <span className="font-semibold">Deadline: </span>
                    <span className="">{moment(deadline).format("hh:mm a, Do MMM YYYY")}</span>
                </p>
            </div>
            <Modal name={`deleteTaskModal${_id}`} closeBtnRef={deleteCloseBtnRef}>
                <h4 className="uppercase font-semibold text-sm mb-3">Are you sure to delete?</h4>
                <div>
                    <button onClick={deleteTask} className="btn btn-sm btn-error text-white rounded uppercase text-[14px]">Delete</button>
                </div>
            </Modal>
            <Modal name={`editTaskModal${_id}`} closeBtnRef={editCloseBtnRef}>
                <h4 className="uppercase font-semibold text-sm mb-3">Update Task</h4>
                <form onSubmit={handleSubmit(editTask)}>
                    <input {...register("title", { required: true })} defaultValue={title} placeholder="Enter task title..." className="input input-sm w-full mt-2 text-[12px] border-0 focus:outline-none rounded bg-blue-200 placeholder:text-gray-800" type="text" />
                    {
                        errors?.title && <p className="text-[11px] font-semibold text-error mt-1">Title is required</p>
                    }
                    <textarea {...register("description", { required: true })} defaultValue={description} className="textarea textarea-sm w-full mt-2 text-[12px] border-0 focus:outline-none rounded bg-blue-200 placeholder:text-gray-800 -mb-2" placeholder="Description..."></textarea>
                    {
                        errors?.description && <p className="text-[11px] font-semibold text-error mt-1">Description is required</p>
                    }
                    <select {...register("priority", { required: true })} defaultValue={priority} className="select select-sm w-full text-[12px] border-0 focus:outline-none rounded bg-blue-200 mt-2">
                        <option value={""} disabled selected>Priority</option>
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>High</option>
                    </select>
                    {
                        errors?.priority && <p className="text-[11px] font-semibold text-error mt-1">Priority is required</p>
                    }
                    <div className="mt-2">
                        <span className="text-[11px] mr-2 font-semibold">Deadline: </span>
                        <DateTimePicker className="text-[12px] bg-white" onChange={setNewDeadline} value={newDeadline} />
                    </div>
                    <button className="btn px-6 py-2 w-full h-fit min-h-9 rounded bg-blue-600 hover:bg-blue-700 text-white mt-4 border-0 outline-0 text-[11px] uppercase">Update</button>
                </form>
            </Modal>

            <TaskDetailsModal task={task} detailsCloseBtnRef={detailsCloseBtnRef} />
        </>
    )
};

export default TaskListCard