import { FaFacebook, FaGithub, FaPencilAlt, FaTwitter } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa6";
import { server } from "../../../links";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import userImg from "../../assets/user.png";
import { useQuery } from "@tanstack/react-query";
import InfoItem from "../../components/dashoboard/Profile/InfoItem";
import WebLink from "../../components/dashoboard/Profile/WebLink";
import Cookies from "js-cookie";
import EditProfileModal from "../../components/dashoboard/Profile/EditProfileModal";

const Profile = () => {
    const { user } = useAuth();
    const talikaToken = Cookies.get("talikaToken");
    const { data: { data: userData = {} } = {}, refetch } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: () => axios.get(`${server}/users/${user?.email}`, { "headers": { "authorization": `Bearer ${talikaToken}` } })
    })

    const { img, name, email, mobile, location, website, facebook, instagram, github, twitter } = userData || {};

    console.log(userData);

    return (
        <div className="px-10 py-10">
            <div className="grid xl:grid-cols-2 gap-5  mt-10 lg:mt-0">
                <div>
                    <div className="card bg-white rounded-sm">
                        <div className="card-body items-center text-center py-8">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={img || userImg} />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold -mb-2">{name}</h4>
                            <p className="text-lg">{location}</p>
                            <div className="card-actions mt-3">
                                <button onClick={() => document.getElementById('editProfileModal').showModal()} className="btn bg-[#064e89] hover:bg-[#095da1] text-white flex items-center justify-center">
                                    <FaPencilAlt />
                                    <span>EDIT</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card card-compact bg-white rounded-sm mb-8">
                        <div className="card-body">
                            <h3 className=" font-semibold border-b border-[#b8b8b8] pb-4 text-xl">Info</h3>
                            <InfoItem data={{ name: "Full Name", value: name }} />
                            <InfoItem data={{ name: "Email", value: email }} />
                            <InfoItem data={{ name: "Mobile", value: mobile }} />
                            <InfoItem data={{ name: "Location", value: location }} />
                        </div>
                    </div>
                    <div className="card card-compact bg-white rounded-sm">
                        <div className="card-body">
                            <h3 className=" font-semibold border-b border-[#b8b8b8] pb-4 text-xl">Important Links</h3>
                            <WebLink data={{ name: "Website", value: website }}>
                                <TbWorldWww color="#ff7171" size={24} />
                            </WebLink>
                            <WebLink data={{ name: "Facebook", value: facebook }}>
                                <FaFacebook color="#5136ff" size={24} />
                            </WebLink>
                            <WebLink data={{ name: "Instagram", value: instagram }}>
                                <FaInstagram color="#ff43c5" size={24} />
                            </WebLink>
                            <WebLink data={{ name: "Github", value: github }}>
                                <FaGithub color="#17b123" size={24} />
                            </WebLink>
                            <WebLink data={{ name: "Twitter", value: twitter }}>
                                <FaTwitter color="#5ea7ff" size={24} />
                            </WebLink>
                        </div>
                    </div>
                </div>
            </div>
            {
                userData?._id &&
                <EditProfileModal userData={userData} refetch={refetch} />
            }
        </div>
    )
};

export default Profile