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
    const { data: { data: dashboardData = {} } = {} } = useQuery({
        queryKey: ['dashboardData', user?.email],
        queryFn: () => axios.get(`${server}/users/dashboard/${user?.email}`, { "headers": { "authorization": `Bearer ${talikaToken}` } })
    })
    const [data, setData] = useState([
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
        { name: 'D', value: 60 },
        { name: 'E', value: 20 },
        { name: 'F', value: 90 },
        { name: 'G', value: 55 },
    ]);

    return (
        <div className="mb-20 mt-10 w-11/12 mx-auto">
            <h1 className="font-semibold text-3xl uppercase text-[#064e89]">Dashboard</h1>
            <div className="mt-10">
                <DashboardCounts dashboardData={dashboardData} />
                <Barchart data={data} />
            </div>
        </div>
    )
};

export default Dashboard