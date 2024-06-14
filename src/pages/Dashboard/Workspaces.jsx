import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import cover from "../../assets/cover.jpg";
import { toast } from "react-toastify";
import Modal from "../../components/shared/Modal";
import { useForm } from "react-hook-form";
import { imgbbUrl, server } from "../../../links";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const Workspaces = () => {
    const { user } = useAuth();
    const closeBtnRef = useRef();
    const talikaToken = Cookies.get("talikaToken");
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { data: { data: workspaces = [] } = {}, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: () => axios.get(`${server}/workspaces/user/${user?.email}`, { "headers": { "authorization": `Bearer ${talikaToken}` } })
    });

    const createWorkspace = data => {
        const { title, cover } = data;
        if (cover?.length > 0) {
            const image = cover[0];
            const formData = new FormData();
            formData.append('image', image);
            axios.post(imgbbUrl, formData)
                .then(({ data: imgData }) => {
                    if (imgData.success) {
                        const workspace = {
                            title,
                            cover: imgData.data.url,
                            creatorEmail: user.email,
                            createdTime: (new Date()).getTime()
                        }
                        axios.post(`${server}/workspaces`, workspace, { "headers": { "authorization": `Bearer ${talikaToken}` } })
                            .then(({ data }) => {
                                toast.success("Workspace is created successfully");
                                reset();
                                refetch();
                                closeBtnRef.current.click();
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mt-10 lg:mt-0 mb-4">
                <h4 className="uppercase font-semibold text-sm sm:text-base">Workspaces</h4>
                <button onClick={() => document.getElementById('workspaceModal').showModal()} className="text-[12px] flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white btn btn-sm rounded mb-2">
                    <FaPlus />
                    <span>Create Workspace</span>
                </button>
            </div>
            {
                workspaces?.length > 0 ?
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 2xl:gap-10">
                        {
                            workspaces?.map(workspace => <Link key={workspace?._id} to={`/dashboard/workspaces/${workspace?._id}`} className="hero h-[160px] sm:h-[120px] 2xl:h-[160px] rounded-sm overflow-hidden" style={{ backgroundImage: `url(${workspace?.cover || cover})` }}>
                                <div className="hero-overlay bg-opacity-40 w-full h-full"></div>
                                <div className="hero-content text-center text-white px-2 pt-1 h-full w-full justify-start items-start">
                                    <div className="">
                                        <h5 className="font-semibold">{workspace?.title}</h5>
                                    </div>
                                </div>
                            </Link>)
                        }
                    </div> : <div className="text-center pt-4 md:text-xl">
                        <p>You don't have any workspace</p>
                        <p>Create a new workspace</p>
                    </div>
            }
            <Modal name="workspaceModal" closeBtnRef={closeBtnRef}>
                <h4 className="uppercase font-semibold text-sm">Create a workspace</h4>
                <form onSubmit={handleSubmit(createWorkspace)}>
                    <div className="form-control mt-2">
                        <label htmlFor="title" className="label text-sm p-0 mb-1">Title</label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            id="title"
                            placeholder="Workspace Title..."
                            className="input input-sm rounded text-[15px] placeholder:text-[15px]"
                        />
                        {errors.title && (
                            <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                Title is required
                            </p>
                        )}
                    </div>
                    <div className="form-control mt-2">
                        <label htmlFor="cover" className="label text-sm p-0 mb-1">Cover</label>
                        <input
                            {...register("cover")}
                            type="file"
                            id="cover"
                            className="file-input file-input-sm rounded text-[15px] placeholder:text-[15px]"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded uppercase text-[14px] min-h-10">Create</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
};

export default Workspaces