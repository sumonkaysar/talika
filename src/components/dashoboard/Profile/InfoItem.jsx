const InfoItem = ({ data }) => {

    return (
        <div className="border-b border-[#b8b8b8] pb-4 pt-2 flex justify-between">
            <div className="flex items-center gap-2 font-semibold">{data.name}</div>
            <div>
                <p className="text-[#616060]">{data.value || "N/A"}</p>
            </div>
        </div>
    )
};

export default InfoItem