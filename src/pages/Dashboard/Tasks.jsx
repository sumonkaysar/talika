import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../../../links";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "../../components/dashoboard/tasks/TaskCard";
import Cookies from "js-cookie";
import Modal from "../../components/shared/Modal";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Tasks = () => {
    const { id } = useParams();
    const [deadline, setDeadline] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [todos, setTodos] = useState([]);
    const [ongoings, setOngoings] = useState([]);
    const [completeds, setCompleteds] = useState([]);
    const talikaToken = Cookies.get("talikaToken");
    const { user } = useAuth();
    const closeBtnRef = useRef();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { data: { data = [] } = {}, refetch } = useQuery({
        queryKey: ['tasks', id],
        queryFn: () => axios.get(`${server}/tasks/workspaces/${id}`, { "headers": { "authorization": `Bearer ${talikaToken}` } })
    });

    const { data: { data: workspace = {} } = {} } = useQuery({
        queryKey: ['workspace', id],
        queryFn: () => axios.get(`${server}/workspaces/${id}`, { "headers": { "authorization": `Bearer ${talikaToken}` } })
    });

    const handleAddTask = data => {
        const { title, description, priority } = data;
        const task = {
            title,
            description,
            priority,
            workspaceId: id,
            status: "To Do",
            // index: todos[todos.length -1].index + 1,
            deadline: deadline.getTime(),
            creatorEmail: user.email,
            createdTime: (new Date()).getTime()
        }

        axios.post(`${server}/tasks`, task, { "headers": { "authorization": `Bearer ${talikaToken}` } })
            .then(({ data }) => {
                toast.success("task is added successfully");
                reset();
                refetch();
                closeBtnRef.current.click();
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (Array.isArray(data)) {
            setTasks(data)
            setTodos(data?.filter(task => task.status === "To Do"));
            setOngoings(data?.filter(task => task.status === "Ongoing"));
            setCompleteds(data?.filter(task => task.status === "Completed"));
        }
    }, [data]);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mt-10 lg:mt-0 mb-3">
                <h4 className="uppercase font-semibold">Tasks</h4>
                <button onClick={() => document.getElementById("taskAddingModal").showModal()} className="text-[12px] flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white btn btn-sm rounded">
                    <FaPlus />
                    <span>Add Task</span>
                </button>
            </div>
            <h4 className="font-semibold mb-2 text-[14px]">{workspace?.title}</h4>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div>
                    <TaskCard status="To Do" tasks={todos} workspaceId={id} setTasks={setTasks} todos={todos} refetch={refetch} />
                </div>
                <div>
                    <TaskCard status="Ongoing" tasks={ongoings} workspaceId={id} setTasks={setTasks} ongoings={ongoings} refetch={refetch} />
                </div>
                <div>
                    <TaskCard status="Completed" tasks={completeds} workspaceId={id} setTasks={setTasks} completeds={completeds} refetch={refetch} />
                </div>
            </div>
            <Modal name="taskAddingModal" closeBtnRef={closeBtnRef}>
                <form onSubmit={handleSubmit(handleAddTask)} className="">
                    <h4 className="text-sm uppercase font-semibold">Add A Task</h4>
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
                </form>
            </Modal>
        </div>
    )
};

export default Tasks