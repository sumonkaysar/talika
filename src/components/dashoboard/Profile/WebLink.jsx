import { Link } from "react-router-dom";

const WebLink = ({ children, data }) => {
    const urls = data?.value?.split("/");

    return (
        <div className="border-b border-[#b8b8b8] pb-4 pt-2 flex justify-between">
            <div className="flex items-center gap-2 font-semibold">
                {children}
                <span>{data.name}</span>
            </div>
            <div>
                <p className="text-[#616060]">
                    {
                        data.value ?
                            <Link to={data.value}>{urls[urls.length - 1]}</Link> :
                            "N/A"
                    }
                </p>
            </div>
        </div>
    )
};

export default WebLink