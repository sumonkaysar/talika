import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import TaskListCard from "./TaskListCard";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { server } from "../../../../links";
import Cookies from "js-cookie";

const TaskCard = ({ tasks, status, setTasks, workspaceId, refetch }) => {
    const talikaToken = Cookies.get("talikaToken");
    const [isShown, setIsShown] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    const { user } = useAuth();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: "Card",
            drop: (item) => handleMoveTask(item),
            // drop: (item) => setTasks(prevTasks => prevTasks.includes(item.task) ? prevTasks : [...prevTasks, item.task]),
            collect: (monitor) => ({
                isOver: !!monitor.isOver() && monitor.getItem()?.currentStatus !== status
            })
        })
    )

    const handleMoveTask = (item) => {
        const { taskId, currentStatus } = item;
        const move = {
            status,
        }
        if (currentStatus !== status) {
            axios.patch(`${server}/tasks/${taskId}`, move, { "headers": { "authorization": `Bearer ${talikaToken}` } })
                .then(({ data }) => {
                    // toast.success("task is added successfully");
                    refetch();
                })
                .catch(err => console.log(err))
        }
    }

    const handleAddTask = data => {
        const { title, description, priority } = data;
        const task = {
            title,
            description,
            priority,
            workspaceId,
            status,
            // index: tasks[tasks.length -1].index + 1,
            deadline: deadline.getTime(),
            creatorEmail: user.email,
            createdTime: (new Date()).getTime()
        }

        axios.post(`${server}/tasks`, task, { "headers": { "authorization": `Bearer ${talikaToken}` } })
            .then(({ data }) => {
                toast.success("task is added successfully");
                reset();
                setIsShown(false);
                refetch();
            })
            .catch(err => console.log(err))
    }

    console.log("a");

    useEffect(() => {
        if (status === "To Do" || status === "Ongoing") {
            tasks.forEach(task => {
                // if the deadline is about to finish within 6 hours or less
                const remMiliSec = task.deadline - (new Date()).getTime()
                if (remMiliSec < 6 * 3600 * 1000 && remMiliSec > 0) {
                    const remMin = Math.floor(remMiliSec/(1000 * 60)) % 60
                    const remHour = Math.floor(remMiliSec/(1000 * 3600))
                    toast.warning(`${task.title} has only ${remHour}h:${remMin}m`)
                }
                // else if (remMiliSec === 0){
                //     toast.error(`Deadline is finished for ${task.title}`)
                // }
            });
        }
    }, [tasks]);

    return (
        <div className="bg-white py-3 rounded-md" ref={dropRef}>
            <h5 className="text-sm font-semibold mx-4 ">{status}</h5>
            <div>
                {
                    tasks.map(task => <TaskListCard key={task?._id} task={task} refetch={refetch} currentStatus={status} />)
                }
            </div>
            <div className={isOver && "h-10"}>
            </div>
            {
                isShown ? <form onSubmit={handleSubmit(handleAddTask)} className="mx-4">
                    <input {...register("title", { required: true })} placeholder="Enter task title..." className="input input-sm w-full mt-2 text-[12px] border-0 focus:outline-none rounded bg-blue-200 placeholder:text-gray-800" type="text" />
                    {
                        errors?.title && <p className="text-[11px] font-semibold text-error mt-1">Title is required</p>
                    }
                    <textarea {...register("description", { required: true })} className="textarea textarea-sm w-full mt-2 text-[12px] border-0 focus:outline-none rounded bg-blue-200 placeholder:text-gray-800 -mb-2" placeholder="Description..."></textarea>
                    {
                        errors?.description && <p className="text-[11px] font-semibold text-error mt-1">Description is required</p>
                    }
                    <select {...register("priority", { required: true })} className="select select-sm w-full text-[12px] border-0 focus:outline-none rounded bg-blue-200 mt-2">
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
                        <DateTimePicker className="text-[12px] bg-white" onChange={setDeadline} value={deadline} />
                    </div>
                    <button className="btn px-6 py-2 h-fit min-h-fit rounded bg-blue-600 hover:bg-blue-700 text-white mt-4 border-0 outline-0 text-[11px] uppercase">Add</button>
                    <button onClick={() => setIsShown(false)} type="button" className="btn px-6 py-2 h-fit min-h-fit rounded bg-gray-600 hover:bg-gray-700 text-white mt-4 border-0 outline-0 text-[11px] uppercase ml-2">Cancel</button>
                </form> :
                    <div onClick={() => setIsShown(true)} className="flex items-center gap-3 text-xs mt-2 hover:bg-gray-200 p-2 rounded cursor-pointer mx-2">
                        <FaPlus />
                        <span>Add a task</span>
                    </div>
            }

        </div>
    )
};

export default TaskCard