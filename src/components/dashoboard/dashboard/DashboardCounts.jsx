import TotalCard from "./TotalCard";
import { FaTasks } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdTaskAlt } from "react-icons/md";

const DashboardCounts = ({ dashboardData }) => {

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 mb-10 gap-5">
            <TotalCard
                info={{
                    color: "text-yellow-500",
                    bg1: "bg-yellow-50",
                    bg2: "bg-yellow-200",
                    name: "Total Workspaces",
                    value: dashboardData.totalWorkspaces
                }}
                Icon={BsPersonWorkspace}
            />
            <TotalCard
                info={{
                    color: "text-green-500",
                    bg1: "bg-green-50",
                    bg2: "bg-green-200",
                    name: "Total Tasks",
                    value: dashboardData.totalTasks
                }}
                Icon={FaTasks}
            />
            <TotalCard
                info={{
                    color: "text-rose-500",
                    bg1: "bg-rose-50",
                    bg2: "bg-rose-200",
                    name: "High Priority Tasks",
                    value: dashboardData.highPriorityTasks
                }}
                Icon={MdTaskAlt}
            />
        </div>
    )
};

export default DashboardCounts