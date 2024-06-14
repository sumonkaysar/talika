import axios from "axios";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { server } from "../../../../links";
import toast from "react-hot-toast";
import { useRef } from "react";

const EditProfileModal = ({ userData, refetch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { img, name, email, mobile, location, website, facebook, instagram, github, twitter } = userData;
    const closeBtnRef = useRef(null);

    const handleUpdateUser = data => {
        const updateInfo = {};
        Object.keys(data).forEach(key => {
            if (data[key] && userData[key] !== data[key]) {
                updateInfo[key] = data[key]
            }
        });

        if (Object.keys(updateInfo).length > 0) {
            axios.patch(`${server}/users/${email}`, updateInfo)
                .then(({ data }) => {
                    if (data.modifiedCount > 0) {
                        refetch();
                        toast.success("Blog is added successfully");
                        closeBtnRef.current.click();
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <dialog id="editProfileModal" className="modal">
            <div className="modal-box bg-slate-200">
                <form onSubmit={handleSubmit(handleUpdateUser)}>
                    <div className="form-control mt-2">
                        <label htmlFor="name" className="text-sm mb-1">Name</label>
                        <input
                            {...register("name", { required: true })}
                            defaultValue={name}
                            type="text"
                            id="name"
                            placeholder="Name"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                        {errors.name && (
                            <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                Name is required
                            </p>
                        )}
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Email</label>
                        <input
                            defaultValue={email}
                            type="email"
                            placeholder="Email"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                            disabled
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Location</label>
                        <input
                            {...register("location")}
                            defaultValue={location}
                            type="text"
                            placeholder="Location"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Mobile</label>
                        <input
                            {...register("mobile")}
                            defaultValue={mobile}
                            type="text"
                            placeholder="Mobile"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Website Link</label>
                        <input
                            {...register("website")}
                            defaultValue={website}
                            type="text"
                            placeholder="Website Link"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Facebook Link</label>
                        <input
                            {...register("facebook")}
                            defaultValue={facebook}
                            type="text"
                            placeholder="Facebook Link"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Instagram Link</label>
                        <input
                            {...register("instagram")}
                            defaultValue={instagram}
                            type="text"
                            placeholder="Instagram Link"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Github Link</label>
                        <input
                            {...register("github")}
                            defaultValue={github}
                            type="text"
                            placeholder="Github Link"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Twitter Link</label>
                        <input
                            {...register("twitter")}
                            defaultValue={twitter}
                            type="text"
                            placeholder="Twitter Link"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-white ">Update</button>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        <button ref={closeBtnRef} className="btn p-2 h-fit min-h-fit rounded-full bg-slate-600 hover:bg-slate-500 text-white absolute right-2 top-2">
                            <FaTimes />
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
};

export default EditProfileModal