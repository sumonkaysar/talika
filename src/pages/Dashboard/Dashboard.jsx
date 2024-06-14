import { useState } from "react";
import DashboardCounts from "../../components/dashoboard/dashboard/DashboardCounts";
import Barchart from "../../components/dashoboard/dashboard/charts/Barchart";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { server } from "../../../links";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

const Dashboard = () => {
    const { user } = useAuth();
    const talikaToken = Cookies.get("talikaToken");
    const currentYear = (new Date()).getFullYear();
    const { data: { data: dashboardData = {} } = {} } = useQuery({
        queryKey: ['dashboardData', user?.email],
        queryFn: () => axios.get(`${server}/users/dashboard/${user?.email}`, { "headers": { "authorization": `Bearer ${talikaToken}` } })
    });
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const data = dashboardData?.yearlyTasks && Object.entries(dashboardData.yearlyTasks[currentYear]).map(([key, value]) => {
        const month = monthNames[key - 1] || "Unknown";
        return { month, tasks: value };
    });

    return (
        <div className="mb-20 mt-10 w-11/12 mx-auto">
            <h1 className="font-semibold text-3xl uppercase text-[#064e89] pt-5 lg:pt-0">Dashboard</h1>
            <div className="mt-10">
                <DashboardCounts dashboardData={dashboardData} />
                <Barchart data={data} />
            </div>
        </div>
    )
};

export default Dashboard