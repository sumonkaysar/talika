import { useState } from "react";
import TaskCard from "./TaskCard";

const ToDo = () => {
    const [tasks, setTasks] = useState([
        2, 3, 4
    ]);
    
    return (
        <TaskCard tasks={tasks} setTasks={setTasks} status="To Do" />
    )
};

export default ToDo