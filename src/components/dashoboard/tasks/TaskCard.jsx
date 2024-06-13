import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import TaskListCard from "./TaskListCard";
import { useDrop } from "react-dnd";

const TaskCard = ({ tasks, status, setTasks }) => {
    const [isShown, setIsShown] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    const { register, reset, handleSubmit } = useForm(false);
    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: "Card",
            drop: (item) => setTasks(prevTasks => prevTasks.includes(item.task) ? prevTasks : [...prevTasks, item.task]),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        // [x, y]
    )

    const handleAddTask = data => {
        if (data?.task) {
            console.log(data, status);
        }
        reset();
        setIsShown(false)
    }

    return (
        <div className="bg-white py-3 rounded-md">
            <h5 className="text-sm font-semibold mx-4 ">{status}</h5>
            <div ref={dropRef}>
                {
                    tasks.map(task => <TaskListCard task={task} />)
                }
            </div>
            {
                isShown ? <form onSubmit={handleSubmit(handleAddTask)} className="mx-4">
                    <input {...register("task")} placeholder="Enter task title..." className="input input-sm w-full mt-2 text-[12px] border-0 focus:outline-none rounded bg-blue-200 placeholder:text-gray-800" type="text" />
                    <textarea {...register("description")} className="textarea textarea-sm w-full mt-2 text-[12px] border-0 focus:outline-none rounded bg-blue-200 placeholder:text-gray-800" name="" placeholder="Description..."></textarea>
                    <div>
                        <DateTimePicker className="text-[12px] bg-white" onChange={setDeadline} value={deadline} />
                        {/* <Datetime /> */}
                    </div>
                    <button className="btn px-6 py-2 h-fit min-h-fit rounded bg-blue-600 hover:bg-blue-700 text-white mt-2 border-0 outline-0 text-[11px] uppercase">Add</button>
                </form> :
                    <div onClick={() => setIsShown(prevShown => !prevShown)} className="flex items-center gap-3 text-xs mt-2 hover:bg-gray-200 p-2 rounded cursor-pointer mx-2">
                        <FaPlus />
                        <span>Add a task</span>
                    </div>
            }

        </div>
    )
};

export default TaskCard