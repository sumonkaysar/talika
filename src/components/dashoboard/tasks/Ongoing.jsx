import { useState } from "react";
import TaskCard from "./TaskCard";

const Ongoing = () => {
    const [tasks, setTasks] = useState([
        1, 2, 3, 4
    ]);

    return (
        <TaskCard tasks={tasks} setTasks={setTasks} status="Ongoing" />
    )
};

export default Ongoing